import { NextRequest, NextResponse } from "next/server";
import Todo from "@/model/todoModel";

export async function GET(req) {
  try {
    const allTodos = await Todo.find();

    return NextResponse.json({ status: 201, data: allTodos });
  } catch (error) {
    console.error("Error getting todo:", error);
    return NextResponse.json({
      status: 500,
      message: error.message || "Internal Server Error",
    });
  }
}
