import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const dburl = process.env.MONGO_URL;

export const connectDb = async () => {
  if (!dburl) {
    console.error("MONGO_URL is not defined in the environment variables");
    return;
  }

  try {
    await mongoose.connect(dburl);
    console.log("DB Connected Successfully");
  } catch (error) {
    console.error("DB connection error:", error);
  }
};
