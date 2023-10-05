import mongoose from "mongoose";
import cron from "node-cron";
import dotenv from "dotenv";
import appointments from "./models/appointmentModel.js"; // Replace with the actual path to your appointment model

dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.CONNECTION_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define a function to delete old appointments
const deleteOldAppointments = async () => {
  const oneMonthAgo = new Date();
  oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
  console.log(oneMonthAgo.toISOString());
  try {
    // Delete appointments older than one month or rejected
    await appointments.deleteMany({
      $or: [
        { status: "reject" },
        {
          $and: [
            { status: { $ne: "pending" } },
            { status: { $ne: "approved" } }, // Exclude rejected appointments
            { createdAt: { $lt: oneMonthAgo.toISOString() } },
          ],
        },
      ],
    });

    console.log("Old and rejected appointments deleted.");
  } catch (error) {
    console.error("Error deleting appointments:", error);
  }
};

// Schedule the trigger to run daily at a specific time (e.g., midnight)
cron.schedule("0 * * * *", deleteOldAppointments);

// Handle errors
process.on("unhandledRejection", (err) => {
  console.error("Unhandled Promise Rejection:", err);
  process.exit(1);
});

export default deleteOldAppointments;