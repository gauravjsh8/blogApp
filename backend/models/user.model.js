import mongoose from "mongoose";
import validator from "validator";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      requied: true,
    },
    email: {
      type: String,
      requied: true,
      unique: true,
      validate: [validator.isEmail, "Please enter a valid email"],
    },
    phone: {
      type: Number,
      requied: true,
    },
    photo: {
      public_id: {
        type: String,
        requied: true,
      },
      url: {
        type: String,
        requied: true,
      },
    },
    education: {
      type: String,
      requied: true,
    },
    role: {
      type: String,
      requied: true,
      enum: ["user", "admin"],
    },
    password: {
      type: String,
      requied: true,
      select: false,
      minLength: 8,
    },
    token: {
      type: String,
    },
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
