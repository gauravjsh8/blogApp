import express from "express";
import { login, logout, register } from "../controller/user.controller.js";
import { isAuthenticated } from "../middleware/authUser.js";

export const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", isAuthenticated, logout);
