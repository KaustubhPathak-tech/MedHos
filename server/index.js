//jshint esversion: 6
import stripe from "stripe";
import express from "express";
import passport from "passport";
import { Strategy as TwitterStrategy } from 'passport-twitter';
import session from "express-session";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import medicineModel from "./models/medicines.js";
import userRoutes from "./routes/users.js";
import doctorRoutes from "./routes/doctors.js";
import medicineRoutes from "./routes/medicines.js";
import adminRoutes from "./routes/admin.js";
import deleteOldAppointments from "./deleteAppointment.js";
import { allCity } from "./controllers/city.js";
const app = express();
dotenv.config();

app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use("/user", userRoutes);
app.use("/doctor", doctorRoutes);
app.use("/medicines", medicineRoutes);
app.use("/admin", adminRoutes);
app.post("/fetchCity",allCity);
app.get("/", (req, res) => {
  res.send("<h1>Hurray! MedHos server is running</h1>");
});
app.get("/favicon.ico", function (req, res) {
  res.send("<h1>Hurray! Server is Running</h1>");
});
var paymentRequest;
//twitter login

app.use(session({
  secret: 'your-secret-key',
  resave: true,
  saveUninitialized: true,
}));

// Initialize passport and session
app.use(passport.initialize());
app.use(passport.session());
passport.use(new TwitterStrategy({
  consumerKey: process.env.TWITTER_CONSUMER_KEY,
  consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
  callbackURL: process.env.TWITTER_CALLBACK_URL,
},
function(token, tokenSecret, profile, done) {
  // Use the Twitter profile information to create or update a user record
  // and call done() to finish the authentication process.
  return done(null, profile);
}
));

// Add routes for authentication
app.get('/auth/twitter', passport.authenticate('twitter'));
app.get('/auth/twitter/callback',
passport.authenticate('twitter', { failureRedirect: '/' }),
function(req, res) {
  // Successful authentication, redirect to home.
  res.redirect('/');
}
);


//stripe integration
const stripeInstance = stripe(process.env.Stripe_secret);
const YOUR_DOMAIN = "https://medhos.vercel.app";
app.post("/create-checkout-session", async (req, res) => {
  console.log(req.body)
  try {
    const { product, userId,orderId } = req.body;
    paymentRequest = req.body;
    const ProductContainer = [];
    for (var i = 0; i < product.length; i++) {
      var medicine = await medicineModel.findById(product[i].medicineId);
      var qnty = product[i].qty;
      ProductContainer.push({ medicine, qnty });
    }
    const lineItems = ProductContainer.map((med) => ({
      price_data: {
        currency: "inr",
        product_data: {
          name: med?.medicine?.name,
          images: [med?.medicine?.imgurl],
          metadata:{
            userId:userId,
            orderId:orderId, 
          }
        },
        unit_amount: Number(med?.medicine?.price),
      },
      adjustable_quantity: { enabled: true, minimum: 1, maximum: 10 },
      quantity: med.qnty,
    }));
    const session = await stripeInstance.checkout.sessions.create({
      payment_intent_data: {
        metadata: {
          userId: userId,
          orderId:orderId,
        },
        setup_future_usage: "off_session",
      },
      line_items: lineItems,

      mode: "payment",

      success_url: `${YOUR_DOMAIN}/user/orders`,
      cancel_url: `${YOUR_DOMAIN}/user/cart`,
      payment_method_types: ["card"], // You can specify other payment methods as needed
      shipping_address_collection: {
        allowed_countries: ["US", "CA", "IN", "NZ"], // Specify the countries where shipping is allowed
      },
      metadata: {
        userId: userId,
        orderId:orderId,
      },
    });
    res.json({ id: session.id });
  } catch (error) {
    console.log(error);
  }
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
