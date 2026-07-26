import mongoose from "mongoose";
import config from "./config";

const ConnectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(config.MONGODB_URI, {
      serverSelectionTimeoutMS: 10000,
    });
    console.log("Connected to database..");
  } catch (err) {
    console.error("DB connect error:", err);
    process.exit(1);
  }
};

export default ConnectDB;
