import { Request, Response } from "express";
import IdeaModel from "../models/idea.model";

// CREATE IDEA
export async function createIdea(req: Request, res: Response): Promise<void> {
  try {
    // Convert comma separated tag string into an array before saving
    const tags = String(req.body.tags).split(",");
    req.body.tags = tags;

    const created = await IdeaModel.create(req.body);
    res.status(201).json({
      message: "Idea post successful.",
      data: { acknowledged: true, insertedId: created._id },
    });
  } catch (err) {
    res.status(403).json({ message: (err as Error).message });
  }
}

// READ IDEA with limit for the home page rendering
export async function readIdea(_req: Request, res: Response): Promise<void> {
  try {
    const ideas = await IdeaModel.find().limit(6);
    res.status(200).json({
      message: "Idea Fatch Successful.",
      data: ideas,
    });
  } catch (err) {
    res.status(403).json({ message: (err as Error).message });
  }
}

// READ IDEA without condition
export async function readIdeaAll(_req: Request, res: Response): Promise<void> {
  try {
    const ideas = await IdeaModel.find();
    res.status(200).json({
      message: "Idea fetch successful.",
      data: ideas,
    });
  } catch (err) {
    res.status(403).json({ message: (err as Error).message });
  }
}

// UPDATE IDEA
export async function updateIdea(req: Request, res: Response): Promise<void> {
  try {
    const tags = String(req.body.tags).split(",");
    req.body.tags = tags;

    await IdeaModel.findByIdAndUpdate(req.params.id, { $set: req.body });

    res.status(200).json({
      message: "Idea updated successful",
      success: true,
    });
  } catch (err) {
    res.status(403).json({ message: (err as Error).message });
  }
}

// Find specific idea
export async function getIdeaById(req: Request, res: Response): Promise<void> {
  try {
    const result = await IdeaModel.findById(req.params.id);
    res.status(200).json({
      message: "All idea fetch successful.",
      data: result,
    });
  } catch (err) {
    res.status(403).json({ message: (err as Error).message });
  }
}

// DELETE IDEA
export async function deleteIdea(req: Request, res: Response): Promise<void> {
  try {
    const result = await IdeaModel.deleteOne({ _id: req.params.id });

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

// Find my idea with author id
export async function getMyIdeas(req: Request, res: Response): Promise<void> {
  try {
    const ideas = await IdeaModel.find({ author_id: req.params.id });
    res.status(200).json({
      message: "Fetch successful.",
      data: ideas,
    });
  } catch (err) {
    res.status(403).json({ message: (err as Error).message });
  }
}

// Search ideas by title
export async function searchIdeas(req: Request, res: Response): Promise<void> {
  try {
    const { q } = req.query;

    if (!q || typeof q !== "string" || q.trim() === "") {
      res.status(400).json({
        success: false,
        message: "Search query is required",
      });
      return;
    }

    const searchRegex = new RegExp(q, "i"); // 'i' = case insensitive

    const ideas = await IdeaModel.find({ title: { $regex: searchRegex } })
      .sort({ createdAt: -1 })
      .limit(10);

    res.json({
      success: true,
      results: ideas,
      count: ideas.length,
      query: q,
    });
  } catch (err) {
    console.error("Search Error:", err);
    res.status(500).json({
      success: false,
      message: "Server error during search",
    });
  }
}
