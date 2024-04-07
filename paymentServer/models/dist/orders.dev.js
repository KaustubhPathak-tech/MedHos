"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// Import necessary modules
// Create a Mongoose schema
var orderSchema = new _mongoose["default"].Schema({
  user: {
    type: String,
    required: true
  },
  orderId: {
    type: String,
    required: true
  },
  orderItems: {
    type: Array,
    required: true
  },
  shippingAddress: {
    type: String,
    required: true
  },
  status: {
    type: String,
    "enum": ["pending", "Order Confirmed", "shipped", "out for delivery", "delivered", "cancelled"],
    "default": "pending"
  },
  confirmed: {
    type: Boolean,
    "default": false
  },
  createdAt: {
    type: Date,
    "default": Date.now
  }
});

var Order = _mongoose["default"].model("Order", orderSchema);

var _default = Order;
exports["default"] = _default;