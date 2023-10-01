//jshint esversion: 6
import stripe from "stripe";
import { Server } from "socket.io";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

import userRoutes from "./routes/users.js";
import doctorRoutes from "./routes/doctors.js";
const app = express();
dotenv.config();

const io = new Server(8000, { cors: true });

const etoSockets = new Map();
const socketToEts = new Map();

io.on("connection", (socket) => {
  console.log("socket connected", socket.id);
  socket.on("room:join", ({ Email, Room }) => {
    etoSockets.set(Email, socket.id);
    socketToEts.set(socket.id, Email);
    io.to(Room).emit("user:joined", { Email, id: socket.id });
    socket.join(Room);
    io.to(socket.id).emit("room:join", { Email, Room });
  });
  socket.on("disconnect", () => {
    
    console.log("socket disconnected");
  });

  socket.on("user:call", ({ to, offer }) => {
    io.to(to).emit("incoming:call", { from:socket.id,offer });
  });
  socket.on("call:accepted", ({ to, ans }) => {
    io.to(to).emit("call:accepted", { from:socket.id,ans });
  });

  socket.on("peer:nego:needed", ({ to, offer }) => {
    console.log("peer:nego:needed",offer);
    io.to(to).emit("peer:nego:needed", { from:socket.id,offer });
  });
  socket.on("peer:nego:done", ({ to, ans }) => {
    console.log("peer:nego:done",ans);
    io.to(to).emit("peer:nego:final", { from:socket.id,ans });
  });

});

app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use("/user", userRoutes);
app.use("/doctor", doctorRoutes);

app.get("/", (req, res) => {
  res.send("<h1>Hurray! Server is Running</h1>");
});
app.get("/favicon.ico", function (req, res) {
  res.send("<h1>Hurray! Server is Running</h1>");
});

//stripe integration
const stripeInstance = stripe(process.env.Stripe_secret);
const YOUR_DOMAIN = "https://medhos.vercel.app";
app.post("/create-checkout-session", async (req, res) => {
  const session = await stripeInstance.checkout.sessions.create({
    line_items: [
      {
        // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
        price_data: {
          currency: "inr",
          product_data: {
            name: "Dakshina",
          },
          unit_amount: 200,
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: `${YOUR_DOMAIN}/`,
    cancel_url: `${YOUR_DOMAIN}/Payment`,
  });
  res.json({ id: session.id });
});

const PORT = process.env.PORT || 7000;
const DATABASE = process.env.CONNECTION_URL;
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
