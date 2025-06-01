import { Hono } from 'hono'
import userRouter from './routes/user'
import postRouter from './routes/post'
import { cors } from 'hono/cors';

export type Bindings = {
  DATABASE_URL: string;
  JWT_SECRET: string;
  FRONTEND_URL: string;
}

export type Variables = {
  userId: string
}

const app = new Hono<{ Bindings: Bindings, Variables: Variables }>()

app.use('/api/v1/*', cors({
  origin: (origin, c) => {
    const allowedOrigins = ['http://localhost:5173', c.env.FRONTEND_URL];
    if (origin && allowedOrigins.includes(origin)) {
      return origin;
    }
    return ''; 
  },
  allowMethods: ['GET', 'POST', 'PUT'],
  credentials: true
}));


app.route("/api/v1/user", userRouter);
app.route("/api/v1/post", postRouter);

export default app


