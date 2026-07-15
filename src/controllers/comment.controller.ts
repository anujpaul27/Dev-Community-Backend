import { Request, Response } from "express";
import CommentModel from "../models/comment.model";

// Post comment
export async function createComment(req: Request, res: Response): Promise<void> {
  try {
    const created = await CommentModel.create(req.body);
    res.status(201).json({
      message: "Comment post successful",
      data: { acknowledged: true, insertedId: created._id },
    });
  } catch (err) {
    res.status(403).json({ message: (err as Error).message });
  }
}

// Get comments with post id
export async function getCommentsByPostId(req: Request, res: Response): Promise<void> {
  try {
    const comments = await CommentModel.find({ postID: req.params.id });
    res.status(200).json({
      message: "Comment fetch successful.",
      data: comments,
    });
  } catch (err) {
    res.status(403).json({ message: (err as Error).message });
  }
}

// Get comment with comment id
export async function getCommentById(req: Request, res: Response): Promise<void> {
  try {
    const comments = await CommentModel.find({ _id: req.params.id });
    res.status(200).json({
      message: "Comment fetch successful.",
      data: comments,
    });
  } catch (err) {
    res.status(403).json({ message: (err as Error).message });
  }
}

// Get comments with user id
export async function getCommentsByUserId(req: Request, res: Response): Promise<void> {
  try {
    const comments = await CommentModel.find({ userID: req.params.id });
    res.status(200).json({
      message: "Comment fetch successful.",
      data: comments,
    });
  } catch (err) {
    res.status(403).json({ message: (err as Error).message });
  }
}

// Update comment
export async function updateComment(req: Request, res: Response): Promise<void> {
  try {
    await CommentModel.findByIdAndUpdate(req.params.id, {
      $set: { text: req.body.text },
    });

    res.status(200).json({
      message: "Idea updated successful",
      success: true,
    });
  } catch (err) {
    res.status(403).json({ message: (err as Error).message });
  }
}

// Delete comment
export async function deleteComment(req: Request, res: Response): Promise<void> {
  try {
    const result = await CommentModel.deleteOne({ _id: req.params.id });

    if (result.deletedCount === 0) {
      res.status(404).json({
        message: "Idea not found. Nothing was deleted.",
      });
      return;
    }

    res.status(200).json({
      message: "Idea Delete Successful.",
      data: result,
    });
  } catch (err) {
    res.status(403).json({ message: (err as Error).message });
  }
}
