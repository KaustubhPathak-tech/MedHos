import express from "express";
import {doctorlogin,doctorsignup} from "../controllers/auth.js"
const router=express.Router();

router.post("/signup",doctorsignup);
router.post("/login",doctorlogin);


export default router