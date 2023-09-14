//eslint version:6
import stripe from 'stripe';
import express from "express";
import cors from 'cors'
import dotenv from "dotenv"
import mongoose from "mongoose";

import userRoutes from "./routes/users.js";
import doctorRoutes from "./routes/doctors.js"
const app = express();
dotenv.config();

app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());


app.use("/user", userRoutes);
app.use("/doctor",doctorRoutes);

app.get("/", (req, res) => {
  res.send("<h1>Hurray! Server is Running</h1>");
});

//stripe integration
const stripeInstance = stripe(process.env.Stripe_secret);
const YOUR_DOMAIN = 'http://localhost:3000';
app.post('/create-checkout-session', async (req, res) => {
  const session = await stripeInstance.checkout.sessions.create({
    line_items: [
      {
        // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
        price_data:{
          currency:"inr",
          product_data:{
            name:"Dakshina"
          },
          unit_amount:200
        },
        quantity:1,
        
      },
    ],
    mode: 'payment',
    success_url: `${YOUR_DOMAIN}/`,
    cancel_url: `${YOUR_DOMAIN}/Payment`,
  });
  console.log("fuction_called");
  res.json({id:session.id});
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
  .catch((err) => {console.log(err.message);console.log("         Database URL       ")});

  export default app;
