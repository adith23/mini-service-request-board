import mongoose from "mongoose";
import { config } from "./index.js";

export async function connectDatabase(): Promise<typeof mongoose> {
  mongoose.set("strictQuery", true);

  try {
    const connection = await mongoose.connect(config.mongoUri, {
      autoIndex: !config.isProduction,
    });

    console.log(`MongoDB connected: ${connection.connection.host}`);
    return connection;
  } catch (error) {
    console.error("MongoDB connection failed");
    throw error;
  }
}

export async function disconnectDatabase(): Promise<void> {
  if (mongoose.connection.readyState !== 0) {
    await mongoose.disconnect();
  }
}
