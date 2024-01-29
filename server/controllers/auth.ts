import bcrypt from "bcrypt";
import User from "../models/User.js";
import jwt, { Secret } from "jsonwebtoken";

import { Request, Response } from "express";
import { Multer } from "multer";

interface ControllerProps {
  req: Request;
  res: Response;
}

/* REGISTER USER */
export const register = async (req: Request, res: Response) => {
  try {
    const { userName, email, bio, password, picturePath } = req.body;
    const awsPicturePath = (req.file as Express.MulterS3.File).location;
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new User({
      userName,
      email,
      bio,
      password: passwordHash,
      picturePath: awsPicturePath,
    });

    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
/* LOGGING IN */
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    console.log(email, password);

    const user: Partial<{
      email: string;
      _id: string;
      password: string;
    }> | null = await User?.findOne({ email: email });
    if (!user) return res.status(400).json({ msg: "User does not exist. " });

    const isMatch = await bcrypt.compare(password, user?.password || "");
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials. " });

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET as Secret
    ) as string;

    delete user.password;

    res.status(200).json({ token, user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
