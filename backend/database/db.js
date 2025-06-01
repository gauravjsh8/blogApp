import mongoose from "mongoose";

export const connectToDb = async () => {
  const MONGO_URL = process.env.MONGO_URI;

  try {
    await mongoose.connect(MONGO_URL);
    console.log("Connected to the database Successfully");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
