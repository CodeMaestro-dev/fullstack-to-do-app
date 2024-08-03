import { NextRequest, NextResponse } from "next/server";
import Todo from "@/model/todoModel";
import mongoose from "mongoose";

export async function GET(req) {
  try {
    // Ensure database connection is ready
    if (mongoose.connection.readyState !== 1) {
      await mongoose.connect(process.env.MONGODB_URI, {
        serverSelectionTimeoutMS: 5000, // 5 seconds timeout
      });
    }

    // Fetch all todos from the database
    const allTodos = await Todo.find();

    console.log(allTodos);

    // Return the list of todos
    const response = NextResponse.json({ status: 200, data: allTodos });

    // Disable caching
    response.headers.set("Cache-Control", "no-store, must-revalidate");

    return response;
  } catch (error) {
    console.error("Error getting todos:", error);
    return NextResponse.json({
      status: 500,
      message: error.message || "Internal Server Error",
    });
  }
}
