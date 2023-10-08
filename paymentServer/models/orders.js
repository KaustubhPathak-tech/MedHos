// Import necessary modules
import mongoose from "mongoose";

// Create a Mongoose schema
const orderSchema = new mongoose.Schema({
  user: {
    type: String,
    required: true,
  },
  orderId: {
    type: String,
    required: true,
  },
  orderItems: {
    type: Array,
    required: true,
  },
  shippingAddress: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["pending","Order Confirmed", "shipped", "out for delivery", "delivered", "cancelled"],
    default: "pending",
  },
  confirmed:{type:Boolean,default:false},
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create a Mongoose model
const Order = mongoose.model("Order", orderSchema);

// Export the Order model
export default Order;
