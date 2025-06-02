import express from "express";
import {
  createBlog,
  deleteBlog,
  getAllBlogs,
  getMyBlog,
  getSingleBlog,
  updateBlog,
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
blogRouter.get("/getMyBlog", isAuthenticated, isAdmin("admin"), getMyBlog);
blogRouter.put("/update/:id", isAuthenticated, isAdmin("admin"), updateBlog);
