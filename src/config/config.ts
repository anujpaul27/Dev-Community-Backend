import dotenv from "dotenv";

dotenv.config();

if (!process.env.MONGODB_URI) {
  throw new Error("MongoDB URI is empty!.");
}

interface Config {
  PORT: number;
  MONGODB_URI: string;
  CLIENT_URL: string | undefined;
}

const config: Config = {
  PORT: Number(process.env.PORT) || 5000,
  MONGODB_URI: process.env.MONGODB_URI,
  CLIENT_URL: process.env.CLIENT_URL,
};

export default config;
