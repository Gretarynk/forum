import express from "express";
const router = express.Router();
import {
  POST_CREATE_QUESTION,
  GET_ALL_QUESTIONS,
  GET_QUESTION_BY_ID,
  DELETE_QUESTION_BY_ID,
  GET_QUESTIONS_WITH_REGION
} from "../controllers/question.js";
import validation from "../middleware/validation.js";
import questionValidation from "../validationSchema/question.js"

import { auth } from "../middleware/auth.js";

router.post("/questions",validation(questionValidation), auth, POST_CREATE_QUESTION);
router.get("/questions", GET_ALL_QUESTIONS);
router.get("/question/:id", GET_QUESTION_BY_ID);
router.delete("/question/:id",auth, DELETE_QUESTION_BY_ID);
router.get("/questions/:region", GET_QUESTIONS_WITH_REGION);

export default router;
