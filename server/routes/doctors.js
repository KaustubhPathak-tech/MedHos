import express from "express";
import {
  doctorlogin,
  doctorsignup,
  verifyOTP,
} from "../controllers/auth.js";
import {
  getDoctorInfoController,
  updateProfileController,
  getDoctorByIdController,
  doctorAppointmentsController,
  updateStatusController
} from "../controllers/doctor.js";

import mid from "../middlewares/authMiddleware.js"

const router = express.Router();
router.post("/signup", doctorsignup);
router.post("/login", doctorlogin);
// router.post("/send/email", sendVerificationEmail);
router.post("/verify/email", verifyOTP);


//POST SINGLE DOC INFO
router.post("/getDoctorInfo", mid, getDoctorInfoController);

// //POST UPDATE PROFILE
router.post("/updateProfile", mid, updateProfileController);

// //POST  GET SINGLE DOC INFO
router.post("/getDoctorById", mid, getDoctorByIdController);

//GET Appointments
router.post(
  "/doctor-appointments",
  mid,
  doctorAppointmentsController
);

// //POST Update Status
router.post("/update-status", mid, updateStatusController);

export default router;
