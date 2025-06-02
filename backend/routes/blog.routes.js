import express from "express";
import { createBlog } from "../controller/blog.controller.js";

export const blogRouter = express.Router();

blogRouter.post("/create-blog", createBlog);
