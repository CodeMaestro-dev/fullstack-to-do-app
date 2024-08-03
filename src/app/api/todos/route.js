import { NextRequest, NextResponse } from "next/server";
import Todo from "@/model/todoModel";
import mongoose from "mongoose";

export async function GET(req) {
  try {
    // Fetch all todos from the database
    const allTodos = await Todo.find();

    // Disable caching by setting appropriate headers
    const response = NextResponse.json({
      status: 200,
      data: allTodos,
    });

    response.headers.append("Cache-Control", "no-store, must-revalidate");

    return response;
  } catch (error) {
    console.error("Error getting todos:", error);
    return NextResponse.json({
      status: 500,
      message: error.message || "Internal Server Error",
    });
  }
}
