//eslint version:6

import express from "express";
import cors from 'cors'
import dotenv from "dotenv"
import mongoose from "mongoose";

import userRoutes from "./routes/users.js";

const app = express();
dotenv.config();

app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/user", userRoutes);


app.get("/", (req, res) => {
  res.send("<h1>Hurray! Server is Running</h1>");
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
