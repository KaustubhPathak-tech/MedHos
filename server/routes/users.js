import express from "express";
import { glogin, login, signup } from "../controllers/auth.js";
import {
  authController,
  markAllReadNotification,
  getAllNotifications,
  deleteAllNotificationController,
  getAllDoctorsController,
  bookAppointmentController,
  bookingAvailabilityController,
  userAppointmentsController,
  updateOrderStatus,
} from "../controllers/user.js";

import { getOrder, saveOrder,verifyPayment } from "../controllers/order.js";
import mid from "../middlewares/authMiddleware.js";
const router = express.Router();
router.post("/signup", signup);
router.post("/login", login);
router.post("/glogin", glogin);
router.post("/getUserData", mid, authController);

//Apply Doctor || POST

// //Notifiaction  Doctor || POST
router.post("/get-all-notification", getAllNotifications);
router.post("/mark-allRead-notification", mid, markAllReadNotification);
//Notifiaction  Doctor || POST
router.post("/delete-all-notification", mid, deleteAllNotificationController);

// //GET ALL DOC
router.get("/getAllDoctors",mid, getAllDoctorsController);

// //BOOK APPOINTMENT
router.post("/book-appointment", mid, bookAppointmentController);

//Booking Avliability
router.post("/booking-availbility", mid, bookingAvailabilityController);

//Appointments List
router.get("/user-appointments", mid, userAppointmentsController);
router.post("/saveOrder", saveOrder);
router.post("/getOrder",mid, getOrder);
router.post("/updateOrderStatus", updateOrderStatus);
router.post("/verifyPayment", verifyPayment);
export default router;
