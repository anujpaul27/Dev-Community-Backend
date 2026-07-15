import mongoose from "mongoose";
import config from "./config";

const ConnectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(config.MONGODB_URI);
    console.log("Connect to database..");
  } catch (err) {
    console.log((err as Error).message);
  }
};

export default ConnectDB;
