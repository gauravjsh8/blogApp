import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

export const createTokenAndSaveCookie = async (userId, res) => {
  const token = jwt.sign({ userId }, process.env.TOKEN_SECRET, {
    expiresIn: "7d",
  });
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });
  await User.findByIdAndUpdate(userId, { token });
  return token;
};
