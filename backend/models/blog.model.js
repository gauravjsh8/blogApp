import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      requied: true,
    },

    blogImage: {
      public_id: {
        type: String,
        requied: true,
      },
      url: {
        type: String,
        requied: true,
      },
    },
    category: {
      type: String,
      requied: true,
    },
    about: {
      type: String,
      requied: true,
      minLength: [2, "It should contain at least 200 characters"],
    },

    adminName: {
      type: String,
      //  required: true,
    },
    adminPhoto: {
      type: String,
      // requied: true,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },

  { timestamps: true }
);

export const Blog = mongoose.model("Blog", blogSchema);
