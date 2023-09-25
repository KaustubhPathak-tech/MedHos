import jwt from "jsonwebtoken";
import axios from "axios";
import bcrypt from "bcryptjs";
import users from "../models/auth1.js";
import doctors from "../models/doctor.js";
import dotenv from "dotenv";
import nodemailer from "nodemailer";
import { google } from "googleapis";
import UserOTPVerification from "../models/OTP.js";

dotenv.config();

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = "https://developers.google.com/oauthplayground";
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;
const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

const accessToken = await oAuth2Client.getAccessToken();
const transporter = nodemailer.createTransport({
  service: "gmail",

  auth: {
    type: "OAuth2",
    user: "kaustubhpathak9@gmail.com",
    clientId: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
    refreshToken: REFRESH_TOKEN,
    accessToken: accessToken,
  },
});

export const signup = async (req, res) => {
  const { name, email, phone_code, phone, password, userType } = req.body;
  try {
    const existinguser = await users.findOne({ email });

    if (password.length < 8) {
      res.status(406).send("Password should atleast 8 characters long");
      return;
    }
    if (existinguser) {
      res.status(408).send("Account already exists");
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = await users.create({
      name,
      email,
      phone: `+${phone_code}-${phone}`,
      password: hashedPassword,
      avatar:
        "https://w7.pngwing.com/pngs/754/2/png-transparent-samsung-galaxy-a8-a8-user-login-telephone-avatar-pawn-blue-angle-sphere-thumbnail.png",
      userType,
    });

    newUser.save();
    const token = jwt.sign(
      { email: newUser.email, id: newUser._id },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );
    res.status(200).json({ user: newUser, time: Date.now(), token });
  } catch (error) {
    res.status(500).json("Something went wrong...");
  }
};

export const doctorsignup = async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    password,
    contact,
    specialization,
    gender,
    doc_reg_no,
    doc_reg_council,
    doc_degree,
    doc_institute,
    doc_experience,
    est_name,
    doc_fee,
    selectedFile,
  } = req.body.formData;
  const {
    formData,
    userType,
    city,
    doc_reg_year,
    days,
    docSes1s,
    docSes1e,
    docSes2s,
    docSes2e,
  } = req.body;

  try {
    const existinguser = await doctors.findOne({ email });

    if (password.length < 8) {
      res.status(406).send("Password should atleast 8 characters long");
      return;
    }
    if (existinguser) {
      res.status(408).send("Account already exists ");
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 15);

    const newDoctor = await doctors.create({
      name: firstName + " " + lastName,
      email,
      contact,
      specialization,
      gender,
      local_city: city,
      doc_reg_no,
      doc_reg_council,
      doc_reg_year,
      doc_degree,
      doc_institute,
      doc_experience,
      est_name,
      est_city: city,
      file: selectedFile,
      days: days,
      docSes1_start: docSes1s,
      docSes1_end: docSes1e,
      docSes2_start: docSes2s,
      docSes2_end: docSes2e,
      doc_fee,
      password: hashedPassword,
      avatar:
        "https://w7.pngwing.com/pngs/754/2/png-transparent-samsung-galaxy-a8-a8-user-login-telephone-avatar-pawn-blue-angle-sphere-thumbnail.png",
      userType,
    });

    newDoctor.save();
    const token = jwt.sign(
      { email: newDoctor.email, id: newDoctor._id },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );
    res.status(200).json({ user: newDoctor, time: Date.now(), token });
  } catch (error) {
    console.log(error);
    res.status(500).json("Something went wrong...");
  }
};

export const sendVerificationEmail = async (req, res) => {
  const { email } = req.body;
  try {
    const otp = `${Math.floor(1000 + Math.random() * 9000)}`;

    //mailoptions
    const mailoptions = {
      from: "<kaustubhpathak9@gmail.com>",
      to: email,
      subject: "Verify Your Account",
      text: "Hello from Kaustubh",
      html: `<p>Enter <b>${otp}</b> in the website to verify your email address and complete signup!</p><p>This code <b>expires in 1 hour</b>.</p><br/><p><a href="https://stack-over-flow-clone-2023.vercel.app/" style="text-decoration:"none">&copy; Stack Over Flow Clone 2023</a></p>`,
    };

    const Salt = 12;
    const hashedOTP = await bcrypt.hash(`${otp}`, Salt);
    await transporter.sendMail(mailoptions);
    const newOTPVerification = await UserOTPVerification.create({
      userEmail: email,
      otp: hashedOTP,
      createdAt: Date.now(),
      expireAt: Date.now() + 3600000,
    });
    await newOTPVerification.save();
    res.json({
      status: "PENDING",
      message: "Verification otp email sent",
      data: { email },
    });
  } catch (error) {
    res.status(500).send("Enter valid Email");
  }
};
// export const sendVerificationSMS = async (req, res) => {
//   const otp = `${Math.floor(1000 + Math.random() * 9000)}`;
//   const { phone_code, phone } = req.body;
//   const apiKey = process.env.D7SMS;
//   const message = {
//     messages: [
//       {
//         channel: "sms",
//         originator: "Kaustubh",
//         recipients: [`+${phone_code + phone}`],
//         content: ` ${otp} is the OTP to verify your Mobile No. valid for 1 hour.Please Do not Share it with anyone. \n-MedHos`,
//         data_coding: "text",
//       },
//     ],
//   };

//   try {
//     const response = await axios.post(
//       "https://d7sms.p.rapidapi.com/messages/v1/send",
//       message,
//       {
//         headers: {
//           "Content-Type": "application/json",
//           Token:
//             "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJhdXRoLWJhY2tlbmQ6YXBwIiwic3ViIjoiMmRhMGUyNTgtMzQwMi00NzgzLWEwMzAtOWU3ODJjYWRlYWYzIn0.xjc_sV4-s03tHEOg4o70snKoiz2sLf9in_iia6gwT1o",
//           "X-RapidAPI-Key":
//             "4ed5922f47msh7f03366838e7631p16a99bjsn9ee29cca8d10",
//           "X-RapidAPI-Host": "d7sms.p.rapidapi.com",
//         },
//       }
//     );
//     const Salt = 12;
//     const hashedOTP = await bcrypt.hash(`${otp}`, Salt);
//     // await transporter.sendMail(mailoptions);
//     const newOTPVerification = await UserOTPVerification.create({
//       userEmail: phone_code + phone,
//       otp: hashedOTP,
//       createdAt: Date.now(),
//       expireAt: Date.now() + 3600000,
//     });
//     await newOTPVerification.save();
//     res.json({
//       status: "PENDING",
//       message: "Verification otp SMS sent",
//       data: { phone },
//     });
//   } catch (error) {
//     console.error(
//       "Error sending message:",
//       error.response ? error.response.data : error.message
//     );
//     res.status(500).send("Enter valid Phone Number");
//   }
// };

export const verifyOTP = async (req, res) => {
  const { email, otp } = req.body;
  const existingOTP = await UserOTPVerification.findOne({ userEmail: email });

  try {
    const otpId = existingOTP?._id;
    if (!otp) {
      return res.status(400).send("Please enter OTP ");
    } else {
      const UserOTPVerificationRecords = await UserOTPVerification.find({
        _id: otpId,
      });
      if (UserOTPVerificationRecords.length <= 0) {
        return res.status(404).send("Account record doesn't exists");
      } else {
        const { expireAt } = UserOTPVerificationRecords[0];
        const hashedOTP = UserOTPVerificationRecords[0].otp;
        if (expireAt < Date.now()) {
          await UserOTPVerification.deleteMany({ _id: otpId });
          return res
            .status(406)
            .send("Code has expired. Please request again !");
        } else {
          const validOTP = await bcrypt.compare(otp, hashedOTP);
          if (!validOTP) {
            return res.status(409).send("Invalid OTP , Check your Inbox");
          } else {
            await UserOTPVerification.deleteMany({ _id: otpId });
            return res
              .status(200)
              .json({ result: existingOTP, verified: true });
          }
        }
      }
    }
  } catch (error) {
    console.log(error);
    res.json({ status: "FAILED", message: error.message });
  }
};

export const login = async (req, res) => {
  const { email, password, userType } = req.body;

  try {
    const existinguser = await users.findOne({ email });

    if (!existinguser) {
      return res.status(404).send("Account not found ");
    }
    const isPasswordCrt = await bcrypt.compare(password, existinguser.password);

    if (!isPasswordCrt) {
      return res.status(400).send("Invalid Password ");
    }

    const token = jwt.sign(
      { email: existinguser.email, id: existinguser._id },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    res.status(200).json({ user: existinguser, time: Date.now(), token });
  } catch (error) {
    console.log(error);
    res.status(500).json("Something went wrong...");
  }
};

export const doctorlogin = async (req, res) => {
  const { email, password, userType } = req.body;

  try {
    const existinguser = await doctors.findOne({ email });

    if (!existinguser) {
      return res.status(404).send("Account not found ");
    }
    const isPasswordCrt = await bcrypt.compare(password, existinguser.password);

    if (!isPasswordCrt) {
      return res.status(400).send("Invalid Password ");
    }

    const token = jwt.sign(
      { email: existinguser.email, id: existinguser._id },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    res.status(200).json({ user: existinguser, time: Date.now(), token });
  } catch (error) {
    console.log(error);
    res.status(500).json("Something went wrong...");
  }
};

export const glogin = async (req, res) => {
  const { name, email, pic, password, userType } = req.body;

  try {
    const existinguser = await users.findOne({ email });

    if (!existinguser) {
      try {
        const hashedPassword = await bcrypt.hash(password, 12);
        const newUser = await users.create({
          name,
          email,
          password: hashedPassword,
          avatar: pic,
          userType,
        });
        newUser.save().catch((err) => {
          console.log(err);
          res.json({
            status: "FAILED",
            message: "An error occured while saving account.",
          });
        });
        const token = jwt.sign(
          { email: email, id: password },
          process.env.JWT_SECRET,
          {
            expiresIn: "1h",
          }
        );
        return res.status(200).json({ user: newUser, token });
      } catch (error) {
        res.status(500).json("Something went wrong!");
      }
    } else {
      const isPasswordCrt = await bcrypt.compare(
        password,
        existinguser.password
      );

      if (!isPasswordCrt) {
        return res.status(400).send("Invalid Password ");
      }

      const token = jwt.sign(
        { email: existinguser.email, id: existinguser._id },
        process.env.JWT_SECRET,
        {
          expiresIn: "1h",
        }
      );
      {
        /*Highlyconfidential*/
      }

      res.status(200).json({ user: existinguser, time: Date.now(), token });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json("Something went wrong...");
  }
};
