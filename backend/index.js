import express from "express";
import dotenv from "dotenv";
import { connectToDb } from "./database/db.js";
import { router } from "./routes/user.routes.js";
import fileUpload from "express-fileupload";
import { v2 as cloudinary } from "cloudinary";

dotenv.config();

const app = express();

app.use(express.json());
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
    // createParentPath: true,
    // limits: { fileSize: 1000000 },
  })
);

app.use("/api/users", router);

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

const PORT = process.env.PORT || 5000;

connectToDb().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
