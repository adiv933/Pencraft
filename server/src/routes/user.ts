import { Hono } from "hono";
import { Bindings, Variables } from "..";
import { PrismaClient } from "../generated/prisma/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { sign, verify } from "hono/jwt";
import { signinInput, signupInput } from "@adiv933/medium-common";

const app = new Hono<{ Bindings: Bindings, Variables: Variables }>();

const getPrisma = (url: string) =>
    new PrismaClient({ datasourceUrl: url }).$extends(withAccelerate());

app.post("/signup", async (c) => {
    const { email, name, password } = await c.req.json();

    const { success } = signupInput.safeParse({ email, name, password });

    if (!success) {
        return c.json({ error: "Incorrect inputs" }, 400);
    }

    if (!email || !name || !password) {
        return c.json({ error: "Missing required fields" }, 400);
    }

    try {
        const prisma = getPrisma(c.env.DATABASE_URL);

        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            return c.json({ message: "User with this email already exists" }, 409);
        }

        const user = await prisma.user.create({
            data: { email, name, password }, //! hash password
        });

        const token = await sign({ id: user.id }, c.env.JWT_SECRET);
        return c.json({ token }, 201);
    } catch (error) {
        console.error("Signup failed:", error);
        return c.json({ message: "Internal Server Error" }, 500);
    }
});

app.post("/signin", async (c) => {
    const { email, password } = await c.req.json();

    const { success } = signinInput.safeParse({ email, password });

    if (!success) {
        return c.json({ error: "Incorrect inputs" }, 400);
    }

    if (!email || !password) {
        return c.json({ message: "Missing email or password" }, 400);
    }

    try {
        const prisma = getPrisma(c.env.DATABASE_URL);

        const user = await prisma.user.findUnique({ where: { email } });

        if (!user || user.password !== password) {
            return c.json({ message: "Invalid email or password" }, 403);
        }

        const token = await sign({ id: user.id }, c.env.JWT_SECRET);
        return c.json({ token }, 200);
    } catch (error) {
        console.error("Signin failed:", error);
        return c.json({ message: "Internal Server Error" }, 500);
    }
});

app.get("/me", async (c) => {
    const jwt = c.req.header('Authorization');
    if (!jwt) {
        return c.json({ message: "Unauthorized" }, 401);
    }
    const token = jwt.split(' ')[1];
    if (!token) {
        return c.json({ message: "Wrong header format" }, 401);
    }
    const payload = await verify(token, c.env.JWT_SECRET);
    if (!payload || typeof payload.id !== 'string') {
        return c.json({ message: "Unauthorized" }, 401);
    }
    const userId = payload.id;

    if (!userId) return c.json({ message: "Unauthorized" }, 401);

    try {
        const prisma = getPrisma(c.env.DATABASE_URL);
        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: { id: true, name: true }
        });

        if (!user) return c.json({ message: "User not found" }, 404);

        return c.json(user, 200);
    } catch (error) {
        console.error("Failed to fetch user:", error);
        return c.json({ message: "Internal Server Error" }, 500);
    }
});


export default app;
