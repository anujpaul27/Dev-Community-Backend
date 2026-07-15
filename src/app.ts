import express, { Application, Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import ideaRouter from "./routers/idea.router";
import commentRouter from "./routers/comment.router";

const app: Application = express();

// middleware
app.use(express.json());
app.use(cors());
app.use(cookieParser());

// routes
// Mounted at root (no path prefix) to keep the original, unprefixed URLs
// (e.g. /create-idea, /comment/:id) working exactly as before.
app.use(ideaRouter);
app.use(commentRouter);

app.get("/", (_req: Request, res: Response) => {
  res.send("Server is running..");
});

export default app;
