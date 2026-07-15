import { Router } from "express";
import {
  createIdea,
  readIdea,
  readIdeaAll,
  updateIdea,
  getIdeaById,
  deleteIdea,
  getMyIdeas,
  searchIdeas,
} from "../controllers/idea.controller";

const ideaRouter = Router();

ideaRouter.post("/create-idea", createIdea);
ideaRouter.get("/read-idea", readIdea);
ideaRouter.get("/read-idea-all", readIdeaAll);
ideaRouter.put("/idea-update/:id", updateIdea);
ideaRouter.get("/idea/:id", getIdeaById);
ideaRouter.delete("/idea-delete/:id", deleteIdea);
ideaRouter.get("/my-ideas/:id", getMyIdeas);
ideaRouter.get("/search", searchIdeas);

export default ideaRouter;
