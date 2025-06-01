import { User } from "../models/user.model.js";
import { v2 as cloudinary } from "cloudinary";
import bcrypt from "bcrypt";

export const register = async (req, res) => {
  try {
    if (!req.files || Object.keys(req.files).length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "User photo is required." });
    }
    const { photo } = req.files;
    const allowedFileFormats = ["image/jpg", "image/png"];
    if (!allowedFileFormats.includes(photo.mimetype)) {
      return res.status(400).json({
        success: false,
        message: "Invalid photo. Only png and jpg formats allowed",
      });
    }

    const { name, email, password, phone, education, role } = req.body;

    if (
      !name ||
      !email ||
      !password ||
      !phone ||
      !education ||
      !role ||
      !photo
    ) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required." });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "User already exists with this email.",
      });
    }

    const cloudinaryResponse = await cloudinary.uploader.upload(
      photo.tempFilePath
    );
    if (!cloudinaryResponse || cloudinaryResponse.error) {
      console.log(cloudinaryResponse.error);

      const hashedPassword = await bcrypt.hash(password, 8);
    }
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      phone,
      education,
      role,
      photo: {
        public_id: cloudinaryResponse.public_id,
        url: cloudinaryResponse.url,
      },
    });

    return res.status(201).json({
      success: true,
      message: "User Created.",
      user: newUser,
    });
  } catch (error) {
    console.log("User createion failed", error);
  }
};
