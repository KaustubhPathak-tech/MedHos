import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import users from "../models/auth1.js";

import dotenv from "dotenv";

dotenv.config();


export const signup = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existinguser = await users.findOne({ email });

    if (password.length < 8) {
      res.status(406).send("Password should atleast 8 characters long");
      return;
    }
    if (existinguser) {
      res.status(408).send("User with this Email already exists");
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = await users.create({
      name,
      email,
      password: hashedPassword,
      avatar:"https://w7.pngwing.com/pngs/754/2/png-transparent-samsung-galaxy-a8-a8-user-login-telephone-avatar-pawn-blue-angle-sphere-thumbnail.png",
      
    });

    newUser.save();
    const token = jwt.sign(
        { email: newUser.email, id: newUser._id },
        process.env.JWT_SECRET,
        {
          expiresIn: "1h",
        }
      );
      res
      .status(200)
      .json({ result: newUser, time: Date.now(),token });
  } catch (error) {
    console.log(error);
    res.status(500).json("Something went wrong...");
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existinguser = await users.findOne({ email });

    if (!existinguser) {
      return res.status(404).send("User does not exists, Sign up first");
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
    

    res
      .status(200)
      .json({ result: existinguser, time: Date.now(),token });
  } catch (error) {
    console.log(error);
    res.status(500).json("Something went wrong...");
  }
};