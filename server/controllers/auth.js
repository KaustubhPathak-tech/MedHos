import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import users from "../models/auth1.js";
import doctors from "../models/doctor.js";
import dotenv from "dotenv";


dotenv.config();

export const signup = async (req, res) => {
  const { name, email, password, userType } = req.body;
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
      docSes1_start:docSes1s,
      docSes1_end:docSes1e,
      docSes2_start:docSes2s,
      docSes2_end:docSes2e,
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
        res.status(500).json("Something went wrong...");
      }
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
    {
      /*Highlyconfidential*/
    }

    res.status(200).json({ user: existinguser, time: Date.now(), token });
  } catch (error) {
    console.log(error);
    res.status(500).json("Something went wrong...");
  }
};
