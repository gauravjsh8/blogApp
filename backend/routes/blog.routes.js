import express from "express";
import { createBlog } from "../controller/blog.controller.js";
import { isAdmin, isAuthenticated } from "../middleware/authUser.js";

export const blogRouter = express.Router();

blogRouter.post("/create-blog", isAuthenticated, isAdmin("admin"), createBlog);
