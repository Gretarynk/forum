import express from "express";
const router=express.Router();
import {POST_CREATE_ANSWER,GET_ALL_ANSWERS, DELETE_ANSWER_BY_ID} from "../controllers/answer.js"
import validation from "../middleware/validation.js";

import { auth } from "../middleware/auth.js";


router.post("/question/:id/answer",auth,POST_CREATE_ANSWER );
router.get("/question/:id/answers",auth,GET_ALL_ANSWERS );
router.delete("/answer/:id",auth,DELETE_ANSWER_BY_ID );





export default router;