import users from "../models/auth1.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import doctors from "../models/doctor.js";
import Order from "../models/orders.js";
import appointmentModel from "../models/appointmentModel.js";
import moment from "moment";

// Register callback
const registerController = async (req, res) => {
  try {
    const existingUser = await users.findOne({ email: req.body.email });
    if (existingUser) {
      return res
        .status(200)
        .send({ message: "User Already Exist", success: false });
    }
    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    req.body.password = hashedPassword;
    const newUser = new userModel(req.body);
    await newUser.save();
    res.status(201).send({ message: "Register Successfully", success: true });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: `Register Controller ${error.message}`,
    });
  }
};

// Login callback
const loginController = async (req, res) => {
  try {
    const user = await userModel.findOne({ email: req.body.email });
    if (!user) {
      return res
        .status(200)
        .send({ message: "User not found", success: false });
    }
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      return res
        .status(200)
        .send({ message: "Invalid Email or Password", success: false });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res.status(200).send({ message: "Login Success", success: true, token });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: `Error in Login CTRL ${error.message}` });
  }
};

const authController = async (req, res) => {
  if(req?.body?.userType === "user"){
    try {
      const user = await users.findById({ _id: req?.body?.userId });
      // user.password = 0;
      if (!user) {
        return res.status(200).send({
          message: "User not found",
          success: false,
        });
      } else {
        res.status(200).send({
          success: true,
          data: user,
        });
      }
    } catch (error) {
      console.log(error);
      res.status(500).send({
        message: "Auth error",
        success: false,
        error,
      });
    }
  }
  else{
    try {
      const user = await doctors.findById({ _id: req?.body?.userId });
      // user.password = 0;
      if (!user) {
        return res.status(200).send({
          message: "User not found",
          success: false,
        });
      } else {
        res.status(200).send({
          success: true,
          data: user,
        });
      }
    } catch (error) {
      console.log(error);
      res.status(500).send({
        message: "Auth error",
        success: false,
        error,
      });
    }
  }
  
};

// Apply Doctor Controller
const applyDoctorController = async (req, res) => {
  try {
    console.log("hi I am above await_____________________________", req.body);
    const newDoctor = await doctorModel({ ...req.body, status: "pending" });
    await newDoctor.save();
    console.log("hi I am below await_______________________________");
    const adminUser = await userModel.findOne({ isAdmin: true });
    const notification = adminUser.notification;
    notification.push({
      type: "apply-doctor-request",
      message: `${newDoctor.firstName} ${newDoctor.lastName} has applied for a doctor account`,
      data: {
        doctorId: newDoctor._id,
        name: newDoctor.firstName + " " + newDoctor.lastName,
        onClickPath: "/admin/doctors",
      },
    });
    await userModel.findByIdAndUpdate(adminUser._id, { notification });
    res.status(201).send({
      success: true,
      message: "Doctor account applied successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while applying for doctor",
    });
  }
};

// Notification Controller
const markAllReadNotification = async (req, res) => {
  if (req?.body?.userType === "user") {
    try {
      const user = await users.findById({ _id: req?.body?.userId });
      const seenNotification = user.seennotification;
      const notification = user.notification;
      seenNotification.push(...notification);
      user.notification = [];
      user.seenNotification = notification;
      const updatedUser = await user.save();
      res.status(200).send({
        success: true,
        message: "All notification marked as read",
        data: updatedUser,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        message: "Error in notification",
        success: false,
        error,
      });
    }
  } else {
    try {
      const user = await doctors.findById({ _id: req?.body?.userId });
      const seenNotification = user.seennotification;
      const notification = user.notification;
      seenNotification.push(...notification);
      user.notification = [];
      user.seenNotification = notification;
      const updatedUser = await user.save();
      res.status(200).send({
        success: true,
        message: "All notification marked as read",
        data: updatedUser,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        message: "Error in notification",
        success: false,
        error,
      });
    }
  }
};

const getAllNotifications = async (req, res) => {
  if (req?.body?.userType === "user") {
    try {
      const user = await users.findById({ _id: req?.body?.userId });
      const notification = user.notification;
      const seennotification = user.seennotification;
      res.status(200).send({
        success: true,
        message: "All notification fetched",
        notification,seennotification
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        message: "Error in notification",
        success: false,
        error,
      });
    }
  } else {
    try {
      const user = await doctors.findById({ _id: req?.body?.userId });
      const notification = user.notification;
      const seennotification = user.seennotification;
      res.status(200).send({
        success: true,
        message: "All notification fetched",
        notification,seennotification
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        message: "Error in notification",
        success: false,
        error,
      });
    }
  }
};

// Delete notifications
const deleteAllNotificationController = async (req, res) => {
  if(req?.body?.userType === "user"){
    try {
      const user = await users.findById({ _id: req?.body?.userId });
      user.notification = [];
      user.seennotification = [];
      const updatedUser = await user.save();
      updatedUser.password = undefined;
      res.status(200).send({
        success: true,
        message: "Notifications deleted successfully",
        data: updatedUser,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Unable to delete all notifications",
        error,
      });
    }
  }
  else{
    try {
      const user = await doctors.findById({ _id: req?.body?.userId });
      user.notification = [];
      user.seennotification = [];
      const updatedUser = await user.save();
      updatedUser.password = undefined;
      res.status(200).send({
        success: true,
        message: "Notifications deleted successfully",
        data: updatedUser,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Unable to delete all notifications",
        error,
      });
    }
  }
  
};

// GET ALL DOCTORS
const getAllDoctorsController = async (req, res) => {
  try {
    const doctor = await doctors.find({ status: "approved" });
    res.status(200).send({
      success: true,
      message: "Doctors Lists Fetched Successfully",
      data: doctor,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error While Fetching Doctor",
    });
  }
};

// BOOK APPOINTMENT
const bookAppointmentController = async (req, res) => {
  try {
    req.body.status = "pending";
    const newAppointment = new appointmentModel(req.body);
    await newAppointment.save();
    const user = await doctors.findOne({ _id: req?.body?.doctorInfo });
    user.notification.push({
      type: "New-appointment-request",
      message: `A new Appointment Request from ${req.body.userName}`,
      onClickPath: "/user/appointments",
    });
    await user.save();
    res.status(200).send({
      success: true,
      message: "Appointment Booked successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error While Booking Appointment",
    });
  }
};

// Booking Availability Controller
const bookingAvailabilityController = async (req, res) => {
  try {
    const date = moment(req.body.date, "DD-MM-YY").toISOString();
    const fromTime = moment(req.body.time, "HH:mm")
      .subtract(1, "hours")
      .toISOString();
    const toTime = moment(req.body.time, "HH:mm").add(1, "hours").toISOString();
    const doctorId = req.body.doctorId;
    const appointments = await appointmentModel.find({
      doctorId,
      date,
      time: {
        $gte: fromTime,
        $lte: toTime,
      },
    });
    if (appointments.length > 0) {
      return res.status(200).send({
        message: "Appointments not available at this time",
        success: true,
      });
    } else {
      return res.status(200).send({
        success: true,
        message: "Appointments available",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error In Booking",
    });
  }
};

// User Appointments Controller
const userAppointmentsController = async (req, res) => {
  try {
    const appointments = await appointmentModel.find({
      userId: req.body.userId,
    });

    res.status(200).send({
      success: true,
      message: "User's Appointments Fetched Successfully",
      data: appointments,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error In User Appointments",
    });
  }
};
const updateOrderStatus = async (req, res) => {
  try {
    const { orderId, newStatus } = req.body;
    const order = await Order.findOne({orderId:orderId});
    const userId=order.user;
    const user=await users.findById(userId);
    console.log(user);
    const notification = user.notification;
    notification.push({
      type: "order-status-updated",
      message: `Your Order Status has been updated. Status: ${newStatus}`,
      onCLickPath: "/user/orders",
    });
    await user.save();
    order.status = newStatus;
    await order.save();
    const ordersss=await Order.find({confirmed:true});
    res.status(200).json({ order: ordersss });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while updating order status",
    });
  }
}
const updateProfile = async (req, res) => {
  const {formData,userId}=req.body;
  try {
    const user = await users.findById(userId);
    if(formData.name!==''){
      user.name=formData.name;
    }
    if(formData.avatar!==''){
      user.avatar=formData.avatar;
    }
    await user.save();
    res.status(200).json({user});
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while updating order status",
    });
  }
}


export {
  loginController,
  registerController,
  authController,
  applyDoctorController,
  getAllNotifications,
  markAllReadNotification,
  deleteAllNotificationController,
  getAllDoctorsController,
  bookAppointmentController,
  bookingAvailabilityController,
  userAppointmentsController,
  updateOrderStatus,
  updateProfile,
};
