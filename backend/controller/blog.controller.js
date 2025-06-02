import { Blog } from "../models/blog.model.js";
import { v2 as cloudinary } from "cloudinary";

export const createBlog = async (req, res) => {
  try {
    const { title, category, about } = req.body;

    if (!title || !category || !about) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required." });
    }

    if (!req.files || !Object.keys(req.files).length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "Blog Image is required." });
    }

    const { blogImage } = req.files;
    const allowedFileFormats = ["image/jpg", "image/png"];
    if (!allowedFileFormats.includes(blogImage.mimetype)) {
      return res.status(400).json({
        success: false,
        message: "Invalid photo. Only PNG and JPG formats allowed.",
      });
    }

    const adminName = req?.user?.name;
    const adminPhoto = req?.user?.photo;
    const createdBy = req?.user?._id;

    const cloudinaryResponse = await cloudinary.uploader.upload(
      blogImage.tempFilePath
    );
    if (!cloudinaryResponse || cloudinaryResponse.error) {
      console.error(cloudinaryResponse.error);
      return res.status(500).json({
        success: false,
        message: "Failed to upload photo. Please try again.",
      });
    }

    // Create new user
    const newBlog = await Blog.create({
      title,
      category,
      about,
      adminName,
      adminPhoto,
      createdBy,
      blogImage: {
        public_id: cloudinaryResponse.public_id,
        url: cloudinaryResponse.url,
      },
    });

    return res.status(201).json({
      success: true,
      message: "Blog created successfully.",
      user: newBlog,
    });
  } catch (error) {
    console.error("Blog creation failed:", error);
    res.status(500).json({ success: false, message: "Server error." });
  }
};
