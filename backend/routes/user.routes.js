import express from "express";
import { register } from "../controller/user.controller.js";

export const router = express.Router();

router.post("/register", register);
