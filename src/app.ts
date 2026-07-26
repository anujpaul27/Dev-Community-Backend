import express, { Application, Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import ideaRouter from "./routers/idea.router";
import commentRouter from "./routers/comment.router";
import AIrouter from "./routers/code-review.router";
import config from "./config/config";

const app: Application = express();



// middleware
app.use(express.json());
app.use(cors(
  {origin: `${config.CLIENT_URL}`}
));
app.use(cookieParser());

// routes
// Mounted at root (no path prefix) to keep the original, unprefixed URLs
// (e.g. /create-idea, /comment/:id) working exactly as before.
app.use(ideaRouter);
app.use(commentRouter);
app.use(AIrouter)

app.get("/", (_req: Request, res: Response) => {
  res.send("Server is running..");
});

export default app;
