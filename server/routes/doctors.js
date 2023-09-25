import express from "express";
import {doctorlogin,doctorsignup,sendVerificationEmail,verifyOTP} from "../controllers/auth.js"
const router=express.Router();
router.post("/signup",doctorsignup);
router.post("/login",doctorlogin);
router.post("/send/email",sendVerificationEmail);
// router.post("/send/sms",sendVerificationSMS);
// router.post("/verify/sms",verifySMS);

export default router