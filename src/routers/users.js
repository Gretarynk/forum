import express from "express";
const router=express.Router();
import {SIGN_UP, LOG_IN} from "../controllers/users.js"
import validation from "../middleware/validation.js";
import userValidation from "../validationSchema/user.js";
import { auth } from "../middleware/auth.js";


router.post("/users",validation(userValidation), SIGN_UP);
router.post("/users/login",LOG_IN);




export default router;