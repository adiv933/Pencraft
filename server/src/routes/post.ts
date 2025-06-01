import { Hono } from "hono";
import { Bindings, Variables } from "..";
import { PrismaClient } from "../generated/prisma/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { verify } from "hono/jwt";
import { createPostInput, updatePostInput } from "@adiv933/medium-common";

const app = new Hono<{ Bindings: Bindings, Variables: Variables }>();

const getPrisma = (url: string) =>
    new PrismaClient({ datasourceUrl: url }).$extends(withAccelerate());

app.use('/*', async (c, next) => {
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
    c.set('userId', payload.id);
    await next();
})

app.post("/", async (c) => {
    const { title, content } = await c.req.json();

    const { success } = createPostInput.safeParse({ title, content });
    if (!success) {
        return c.json({ error: "Incorrect inputs" }, 400);
    }

    try {
        const prisma = getPrisma(c.env.DATABASE_URL);
        const post = await prisma.post.create({
            data: {
                title,
                content,
                publishedDate: new Date(),
                authorId: c.get('userId'),
            },
        });

        return c.json({ message: "Post created successfully", id: post.id }, 201);
    } catch (error) {
        console.error("Post creation failed:", error);
        return c.json({ message: "Internal Server Error" }, 500);
    }
});

app.put("/", async (c) => {
    const { id, title, content } = await c.req.json();

    const { success } = updatePostInput.safeParse({ id, title, content });
    if (!success) {
        return c.json({ error: "Incorrect inputs" }, 400);
    }

    try {
        const prisma = getPrisma(c.env.DATABASE_URL);
        const updated = await prisma.post.update({
            where: { id },
            data: { title, content },
        });

        return c.json({ message: "Post updated", post: updated }, 200);
    } catch (error) {
        console.error("Update failed:", error);
        return c.json({ message: "Post not found or update failed" }, 404);
    }
});

app.get("/bulk", async (c) => {
    try {
        const prisma = getPrisma(c.env.DATABASE_URL);
        const posts = await prisma.post.findMany({
            include: {
                author: {
                    select: {
                        name: true
                    }
                }
            }
        });


        return c.json({ posts }, 200);
    } catch (error) {
        console.error("Fetching all posts failed:", error);
        return c.json({ message: "Internal Server Error" }, 500);
    }
});

app.get("/:id", async (c) => {
    const id = c.req.param("id");

    try {
        const prisma = getPrisma(c.env.DATABASE_URL);
        const post = await prisma.post.findUnique({
            where: { id },
            include: {
                author: {
                    select: {
                        name: true,
                        id: true
                    }
                }
            }
        });

        if (!post) {
            return c.json({ message: "Post not found" }, 404);
        }

        return c.json({ post }, 200);
    } catch (error) {
        console.error("Fetching post failed:", error);
        return c.json({ message: "Internal Server Error" }, 500);
    }
});



export default app;
