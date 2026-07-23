import { Router } from "express";
import { codeReview } from "../controllers/codeReview.controller";

const AIrouter = Router()

AIrouter.post('/code-review', codeReview)


export default AIrouter 

