import mongoose from "mongoose";
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
    const allowedFileFormats = ["image/jpg", "image/png", "image/jpeg"];
    if (!allowedFileFormats.includes(blogImage.mimetype)) {
      return res.status(400).json({
        success: false,
        message: "Invalid photo. Only PNG and JPG formats allowed.",
      });
    }

    const adminName = req?.user?.name;
    const adminPhoto = req?.user?.photo.url;
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

export const deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;

    const blog = await Blog.findById(id);
    if (!blog) {
      return res.status(404).json({ message: "No blog found" });
    }

    await blog.deleteOne();
    return res.status(200).json({ message: "Blog deleted", deletedBlog: blog });
  } catch (error) {
    return res.status(500).json({ message: "Server Error" });
  }
};

export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find();
    if (!blogs || blogs.length === 0) {
      return res.status(404).json({ message: "No blogs found" });
    }

    return res.status(200).json({ message: "All blogs Found", blogs: blogs });
  } catch (error) {
    return res.status(500).json({ message: "Server Error" });
  }
};

export const getSingleBlog = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ message: "Invalid Blog id" });
    }

    const blog = await Blog.findById(id);
    if (!blog) {
      return res.status(404).json({ message: "No Such blog found" });
    }

    return res.status(200).json({ message: "Blog Found", blog: blog });
  } catch (error) {
    return res.status(500).json({ message: "Server Error" });
  }
};

export const getMyBlog = async (req, res) => {
  try {
    const createdBy = req.user._id;

    const myBlog = await Blog.find({ createdBy });

    return res.status(200).json({ message: "Blog Found", blog: myBlog });
  } catch (error) {
    return res.status(500).json({ message: "Server Error" });
  }
};

export const updateBlog = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ message: "Invalid Blog id" });
    }

    console.log("Incoming update body:", req.body);

    const updateData = { ...req.body };

    // If image is provided, handle it here
    if (req.files && req.files.blogImage) {
      const { blogImage } = req.files;

      const allowedFileFormats = ["image/jpg", "image/png"];
      if (!allowedFileFormats.includes(blogImage.mimetype)) {
        return res.status(400).json({
          success: false,
          message: "Invalid photo. Only PNG and JPG formats allowed.",
        });
      }

      const cloudinaryResponse = await cloudinary.uploader.upload(
        blogImage.tempFilePath
      );

      if (cloudinaryResponse && !cloudinaryResponse.error) {
        updateData.blogImage = {
          public_id: cloudinaryResponse.public_id,
          url: cloudinaryResponse.url,
        };
      }
    }

    const updatedBlog = await Blog.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedBlog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    return res.status(200).json({ message: "Blog Updated", blog: updatedBlog });
  } catch (error) {
    console.log("Error", error);
    return res.status(500).json({ message: "Server Error", error });
  }
};
