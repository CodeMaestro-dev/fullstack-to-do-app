import { NextRequest, NextResponse } from "next/server";
import Todo from "@/model/todoModel";

export async function POST(req) {
  try {
    const body = await req.json();
    const newTodo = await Todo.create({
      uid: Date.now(),
      todo: body.todo,
      completed: false,
    });

    return NextResponse.json({ status: 201, data: newTodo });
  } catch (error) {
    console.error("Error deleting todo:", error);
    return NextResponse.json({
      status: 500,
      message: error.message || "Internal Server Error",
    });
  }
}
