import mongoose from "mongoose";
import cron from "node-cron";
import dotenv from "dotenv";
import Order from "./models/orders.js"; // Replace with the actual path to your order model

dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define a function to delete orders that meet the criteria
const deleteOldOrders = async () => {
  const oneHourAgo = new Date();
  oneHourAgo.setHours(oneHourAgo.getHours() - 1);
  console.log(oneHourAgo.toISOString());
  try {
    // Delete orders where status is "pending", confirmed is false, and createdAt is greater than 1 hour ago
    await Order.deleteMany({
      status: "pending",
      confirmed: false,
      createdAt: { $lt: oneHourAgo },
    });

    console.log("Old pending unconfirmed orders deleted.");
  } catch (error) {
    console.error("Error deleting orders:", error);
  }
};

cron.schedule("*/1 * * * *", deleteOldOrders);

// Handle errors
process.on("unhandledRejection", (err) => {
  console.error("Unhandled Promise Rejection:", err);
  process.exit(1);
});

export default deleteOldOrders;
