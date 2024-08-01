import mongoose from "mongoose";

export async function connectToMongoDB() {
  try {
    await mongoose.connect(process.env.URL);
    console.log("Connected to Database");
  } catch (error) {
    console.error("Error connecting to Database", error);
  }
}
