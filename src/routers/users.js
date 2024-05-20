import express from "express";
const router=express.Router();
import {SIGN_UP, LOG_IN} from "../controllers/users.js"

router.post("/users",SIGN_UP);
router.post("/users/login",LOG_IN);




export default router;