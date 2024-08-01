import mongoose from "mongoose";

let isConnected = false;

export async function connectToMongoDB() {
  if (isConnected) {
    console.log('Using existing database connection');
    return;
  }

  if (!process.env.URL) {
    throw new Error('MongoDB URL is not defined');
  }

  try {
    const db = await mongoose.connect(process.env.URL);

    isConnected = true;
    console.log(`MongoDB Connected: ${db.connection.host}`);
  } catch (error) {
    console.error("Error connecting to Database:", error);
    throw error; // re-throw the error for the caller to handle
  }
}