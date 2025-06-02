import express from "express";
import {
  createBlog,
  deleteBlog,
  getAllBlogs,
  getSingleBlog,
} from "../controller/blog.controller.js";
import { isAdmin, isAuthenticated } from "../middleware/authUser.js";

export const blogRouter = express.Router();

blogRouter.post("/create-blog", isAuthenticated, isAdmin("admin"), createBlog);
blogRouter.delete(
  "/delete-blog/:id",
  isAuthenticated,
  isAdmin("admin"),
  deleteBlog
);

blogRouter.get("/get-all-blogs", getAllBlogs);
blogRouter.get("/single-blog/:id", getSingleBlog);
