import { User } from "../models/user.model.js";
import { v2 as cloudinary } from "cloudinary";
import bcrypt from "bcrypt";
import { createTokenAndSaveCookie } from "../jwt/AuthToken.js";

export const register = async (req, res) => {
  try {
    const { name, email, password, phone, education, role } = req.body;

    // Check all required fields
    if (!name || !email || !password || !phone || !education || !role) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required." });
    }

    // Check for photo upload
    if (!req.files || !req.files.photo) {
      return res
        .status(400)
        .json({ success: false, message: "User photo is required." });
    }

    const { photo } = req.files;
    const allowedFileFormats = ["image/jpg", "image/jpeg", "image/png"];
    if (!allowedFileFormats.includes(photo.mimetype)) {
      return res.status(400).json({
        success: false,
        message: "Invalid photo. Only PNG and JPG formats allowed.",
      });
    }
    console.log("Uploaded photo MIME type:", photo.mimetype);

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "User already exists with this email.",
      });
    }

    // Upload photo to Cloudinary
    const cloudinaryResponse = await cloudinary.uploader.upload(
      photo.tempFilePath
    );
    if (!cloudinaryResponse || cloudinaryResponse.error) {
      console.error(cloudinaryResponse.error);
      return res.status(500).json({
        success: false,
        message: "Failed to upload photo. Please try again.",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 8);

    // Create new user
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

    const token = await createTokenAndSaveCookie(newUser._id, res);

    // Remove password before sending response
    const userResponse = newUser.toObject();
    delete userResponse.password;
    userResponse.token = token;

    return res.status(201).json({
      success: true,
      message: "User created successfully.",
      user: userResponse,
      token,
    });
  } catch (error) {
    console.error("User creation failed:", error);
    res.status(500).json({ success: false, message: "Server error." });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    console.log(req.body);

    if (!email || !password || !role) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required." });
    }

    // Fetch user, including password and role if they are select: false
    const existingUser = await User.findOne({ email }).select("+password ");
    if (!existingUser) {
      return res.status(404).json({
        success: false,
        message: "User doesn't exist with this email.",
      });
    }

    if (existingUser.role !== role) {
      return res
        .status(403)
        .json({ success: false, message: "Invalid role provided." });
    }

    const isPasswordMatch = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isPasswordMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid password." });
    }

    const token = await createTokenAndSaveCookie(existingUser._id, res);

    const userResponse = existingUser.toObject();
    delete userResponse.password;
    userResponse.token = token;

    return res.status(200).json({
      success: true,
      message: "User logged in successfully.",
      user: userResponse,
    });
  } catch (error) {
    console.error("User login failed:", error);
    res.status(500).json({ success: false, message: "Server error." });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("token", { httpOnly: true });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.error("User logout failed:", error);
    res.status(500).json({ success: false, message: "Server error." });
  }
};

export const getMyProfile = async (req, res) => {
  const user = req.user;
  res.status(200).json({ user: user });
};
export const getAdmins = async (req, res) => {
  const admins = await User.find({ role: "admin" });
  res.status(200).json({ admin: admins });
};
