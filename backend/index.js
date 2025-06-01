import express from "express";
import dotenv from "dotenv";
import { connectToDb } from "./database/db.js";

dotenv.config();

const app = express();

app.get("/", (req, res) => {
  res.send("Hello from blog api-Gaurav");
});

const PORT = process.env.PORT || 5000;

connectToDb().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
