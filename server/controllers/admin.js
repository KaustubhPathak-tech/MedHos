import doctors from "../models/doctor.js";
import users from "../models/auth1.js";

// get all users admin route
const getAllUsersController = async (req, res) => {
  try {
    const user = await users.find({});
    res.status(200).send({
      success: true,
      message: "users data list",
      data: user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error while fetching users",
      error,
    });
  }
};

// get all doctors admin route
const getAllDoctorsController = async (req, res) => {
  try {
    const doctor = await doctors.find({});
    res.status(200).send({
      success: true,
      message: "Doctors data list",
      data: doctor,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error while getting doctors data",
      error,
    });
  }
};

// change doctor account status
const changeAccountStatusController = async (req, res) => {
  
  try {
    const { doctorId, status } = req.body;
    const doctor = await doctors.findByIdAndUpdate(doctorId, { status });
    const user = await doctors.findById({ _id: doctor?._id });
    const notification = user.notification;
    notification.push({
      type: "doctor-account-request-updated",
      message: `Your Account Request Has been changed to ${status} `,
      onClickPath: "/notification",
    });
    user.isDoctor = status === "approved" ? true : false;
    await user.save();
    res.status(201).send({
      success: true,
      message: "Account Status Updated",
      data: doctor,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error in Account Status",
      error,
    });
  }
};

export {
  getAllDoctorsController,
  getAllUsersController,
  changeAccountStatusController,
};
