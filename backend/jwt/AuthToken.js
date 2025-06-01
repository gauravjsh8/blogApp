import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

export const createTokenAndSaveCookie = async (userId, res) => {
  const token = jwt.sign({ userId }, process.env.TOKEN_SECRET, {
    expiresIn: "7d",
  });
  res.cookie("token", token, {
    httpOnly: true, //save from xss
    secure: true,
    sameSite: "strict", //save from csrf
  });
  await User.findByIdAndUpdate(userId, { token });
  return token;
};
