import express from "express";
const router=express.Router();
import {POST_CREATE_QUESTION, GET_ALL_QUESTIONS, GET_QUESTION_BY_ID, DELETE_QUESTION_BY_ID} from "../controllers/question.js"
import validation from "../middleware/validation.js";

import { auth } from "../middleware/auth.js";


router.post("/questions",auth,POST_CREATE_QUESTION );
router.get("/questions", GET_ALL_QUESTIONS );
router.get("/questions/:id", GET_QUESTION_BY_ID );
router.delete("/question/:id", DELETE_QUESTION_BY_ID );





export default router;