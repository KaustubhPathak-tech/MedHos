import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import stripe from "stripe";
import bodyParser from "body-parser";
import mongoose from "mongoose";

import users from "./models/auth1.js";
import Order from "./models/orders.js";
import deleteOldOrders from "./deleteoldOrders.js";
const app = express();

app.use(cors());
// payment.use(bodyParser.raw({ type: "application/json" }));

dotenv.config();
const stripeInstance = stripe(process.env.Stripe_secret);

let endpointSecret = process.env.webhook_secret;
app.get("/", (req, res) => {
  res.send("Hello from express");
});
app.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  async (request, response) => {
    let event = request.body;

    if (endpointSecret) {
      // Get the signature sent by Stripe
      const signature = request.headers["stripe-signature"];
      try {
        event = stripeInstance.webhooks.constructEvent(
          request.body,
          signature,
          endpointSecret
        );
      } catch (err) {
        console.log(`⚠️  Webhook signature verification failed.`, err.message);
        return response.sendStatus(400);
      }
    }
    switch (event.type) {
      case "payment_intent.succeeded":
        console.log("PaymentIntent was successful!");
        const paymentIntentData = event.data.object.payment_intent_data;
        const userId = paymentIntentData.metadata;

        // Use the userId to update userInfo or perform other actions.
        console.log("Completed for user ID: ", userId);
        break;
      case "payment_intent.payment_failed":
        console.log("PaymentIntent failed!");
        break;
      case "customer.created":
        console.log("customer created");
        break;
      case "charge.succeeded":
        const successs = event.data.object;
        const Mydata = successs.metadata;
        try {
          const user = await users.findOne({ _id: Mydata.userId });
          console.log(user);
          user.cart = [];
          await user.save();
          // Then define and call a function to handle the event checkout.session.completed
          const order = await Order.findOne({ orderId: Mydata.orderId });
          order.status = "Order Confirmed";
          order.confirmed = true;
          await order.save();
        } catch (error) {
          console.log(error.message);
        }
        console.log("charge succeeded", Mydata);
        break;
      case "checkout.session.async_payment_failed":
        const checkoutSessionAsyncPaymentFailed = event.data.object;
        // Then define and call a function to handle the event checkout.session.async_payment_failed
        console.log("Failed");
        break;
      case "checkout.session.async_payment_succeeded":
        const checkoutSessionAsyncPaymentSucceeded = event.data.object;

        console.log("Success");
        break;
      case "checkout.session.completed":
        const checkoutSessionCompleted = event.data.object;
        // const metadata = checkoutSessionCompleted.metadata;
        // console.log("Completed", metadata);
        //
        break;
      case "checkout.session.expired":
        const checkoutSessionExpired = event.data.object;
        // Then define and call a function to handle the event checkout.session.expired
        console.log("Expired");
        break;
      // ... handle other event types
      default:
        console.log(`Unhandled event type ${event.type}`);
    }
  }
);

//stripe webhook end
const PORT = process.env.PORT || 5000;
const DATABASE = process.env.MONGO_URL;
mongoose
  .connect(DATABASE, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() =>
    app.listen(PORT, () => {
      console.log(`server is running on port ${PORT}`);
    })
  )
  .catch((err) => {
    console.log(err.message);
    console.log("         Database URL       ");
  });

export default app;
