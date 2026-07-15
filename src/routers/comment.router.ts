import { Router } from "express";
import {
  createComment,
  getCommentsByPostId,
  getCommentById,
  getCommentsByUserId,
  updateComment,
  deleteComment,
} from "../controllers/comment.controller";

const commentRouter = Router();

commentRouter.post("/comment", createComment);
commentRouter.get("/comment/:id", getCommentsByPostId);
commentRouter.get("/comments/:id", getCommentById);
commentRouter.get("/comments-userID/:id", getCommentsByUserId);
commentRouter.put("/comments/:id", updateComment);
commentRouter.delete("/comment-delete/:id", deleteComment);

export default commentRouter;
