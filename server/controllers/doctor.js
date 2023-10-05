import appointmentModel from "../models/appointmentModel.js";
import doctors from "../models/doctor.js";
import users from "../models/auth1.js";

// get doctor info in doctor routes
const getDoctorInfoController = async (req, res) => {
  try {
    const doctor = await doctors.findOne({ userId: req.body.userId });
    res.status(200).send({
      success: true,
      message: "doctor data fetch success",
      data: doctor,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in Fetching Doctor Details",
    });
  }
};

// update doc profile
const updateProfileController = async (req, res) => {
  try {
    const doctor = await doctors.findOneAndUpdate(
      { userId: req.body.userId },
      req.body
    );
    console.log("Doctor Object__________________________________________:", doctor);
    res.status(201).send({
      success: true,
      message: "Doctor profile updated successfully",
      data: doctor,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Doctor profile update issue",
      error,
    });
  }
};

// get single doctor
const getDoctorByIdController = async (req, res) => {
  try {
    const doctor = await doctors.findOne({ _id: req.body.doctorId });
    res.status(200).send({
      success: true,
      message: "Single doc info fetched",
      data: doctor,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in single doc info",
    });
  }
};

const doctorAppointmentsController = async (req, res) => {
  try {
    const doctor = await doctors.findById({ _id: req?.body?.userId });
    const appointments = await appointmentModel.find({
      doctorId: doctor._id,
    });
    res.status(200).send({
      success: true,
      message: "Doctor Appointments fetch Successfully",
      data: appointments,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in Doc Appointments",
    });
  }
};

const updateStatusController = async (req, res) => {
  try {
    const { appointmentsId, status } = req.body;
    const appointments = await appointmentModel.findByIdAndUpdate(
      appointmentsId,
      { status }
    );
    const user = await users.findById({ _id: appointments.userId });
    const notification = user.notification;
    notification.push({
      type: "status-updated",
      message: `your appointment has been updated. Status: ${status}`,
      onCLickPath: "/doctor-appointments",
    });
    await user.save();
    res.status(200).send({
      success: true,
      message: "Appointment Status Updated",
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error In Update Status",
    });
  }
};

export {
  getDoctorInfoController,
  updateProfileController,
  getDoctorByIdController,
  doctorAppointmentsController,
  updateStatusController,
};
