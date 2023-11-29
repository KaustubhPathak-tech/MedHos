//jshint esversion: 6
import stripe from "stripe";
import express from "express";
import request from "request";
import passport from "passport";
import { expressjwt } from "express-jwt";
import jwt from "jsonwebtoken";
import TwitterTokenStrategy from "passport-twitter-token";
import User from "./models/auth1.js";
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
import axios from "axios";
import mid from "./middlewares/authMiddleware.js";
const app = express();
dotenv.config();

app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use("/user", userRoutes);
app.use("/doctor", doctorRoutes);
app.use("/medicines", medicineRoutes);
app.use("/admin", adminRoutes);
app.post("/fetchCity", allCity);
app.get("/", (req, res) => {
  res.send("<h1>Hurray! Server is Running</h1>");
});
app.get("/favicon.ico", function (req, res) {
  res.send("<h1>Hurray! Server is Running</h1>");
});
var paymentRequest;

//stripe integration
const stripeInstance = stripe(process.env.Stripe_secret);
const YOUR_DOMAIN = "https://medhos.vercel.app";
app.post("/create-checkout-session", async (req, res) => {
  console.log(req.body);
  try {
    const { product, userId, orderId } = req.body;
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
          metadata: {
            userId: userId,
            orderId: orderId,
          },
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
          orderId: orderId,
        },
        setup_future_usage: "off_session",
      },
      line_items: lineItems,

      mode: "payment",

      success_url: `${YOUR_DOMAIN}/user/orders`,
      cancel_url: `${YOUR_DOMAIN}/user/cart`,
      payment_method_types: ["card"],
      shipping_address_collection: {
        allowed_countries: ["US", "CA", "IN", "NZ"],
      },
      metadata: {
        userId: userId,
        orderId: orderId,
      },
    });
    res.json({ id: session.id });
  } catch (error) {
    console.log(error);
  }
});

//twitter auth
passport.use(
  new TwitterTokenStrategy(
    {
      consumerKey: process.env.TWITTER_CONSUMER_KEY,
      consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
      includeEmail: true,
    },
    function (token, tokenSecret, profile, done) {
      User.upsertTwitterUser(token, tokenSecret, profile, function (err, user) {
        return done(err, user);
      });
    }
  )
);

var createToken = function (auth) {
  return jwt.sign(
    {
      email: auth.email,
      id: auth.id,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: 60 * 120,
    }
  );
};

var generateToken = function (req, res, next) {
  req.token = createToken(req.auth);
  return next();
};
let user="";
let token="";
let cart=[];
var sendToken = async function (req, res) {
  res.setHeader("x-auth-token", req.token);
   user = await User.findById(req.auth.id);
   token = req.token;
   cart = user.cart;
  return res.status(200).send(JSON.stringify(req.user));
};
var getUserCartToken = function () {
  return { user: user, token: token, cart: cart };
};
app.post("/tlogin", (req, res) => {
  try {
    const { user, token, cart } = getUserCartToken();
    return res.status(200).send({ user:user, token:token, cart:cart ,time:Date.now()});
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
});

app.post("/auth/twitter/reverse", (req, res) => {
  request.post(
    {
      url: "https://api.twitter.com/oauth/request_token",
      oauth: {
        oauth_callback: "http%3A%2F%2Flocalhost%3A3000%2Ftwitter-callback",
        consumer_key: process.env.TWITTER_CONSUMER_KEY,
        consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
      },
    },
    function (err, r, body) {
      if (err) {
        return res.status(500).send({ message: err.message });
      }

      var jsonStr =
        '{ "' + body.replace(/&/g, '", "').replace(/=/g, '": "') + '"}';
      res.send(JSON.parse(jsonStr));
    }
  );
});

function parseTwitterResponse(body) {
  const bodyString =
    '{ "' + body.replace(/&/g, '", "').replace(/=/g, '": "') + '"}';
  return JSON.parse(bodyString);
}
app.post(
  "/auth/twitter",
  (req, res, next) => {
    request.post(
      {
        url: `https://api.twitter.com/oauth/access_token?oauth_verifier`,
        oauth: {
          consumer_key: process.env.TWITTER_CONSUMER_KEY,
          consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
          token: req.query.oauth_token,
        },
        form: { oauth_verifier: req.query.oauth_verifier },
      },
      function (err, r, body) {
        if (err) {
          return res.status(500).send({ message: err.message });
        }
        try {
          const bodyString =
            '{ "' + body.replace(/&/g, '", "').replace(/=/g, '": "') + '"}';
          const parsedBody = parseTwitterResponse(body);

          req.body["oauth_token"] = parsedBody.oauth_token;
          req.body["oauth_token_secret"] = parsedBody.oauth_token_secret;
          req.body["user_id"] = parsedBody.user_id;

          next();
        } catch (error) {
          return res.status(500).send({ message: error.message });
        }
      }
    );
  },
  passport.authenticate("twitter-token", { session: false }),
  function (req, res, next) {
    if (!req.user) {
      return res.send(401, "User Not Authenticated");
    }

    req.auth = {
      id: req.user.id,
      email: req.user.email,
    };
    return next();
  },
  generateToken,
  sendToken
);
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
