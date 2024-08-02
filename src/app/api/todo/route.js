import { NextRequest, NextResponse } from "next/server";
import Todo from "@/model/todoModel";

export async function POST(req) {
  try {
    const body = await req.json();
    const newTodo = await Todo.create({
      todo: body.todo,
      completed: false,
    });

    return NextResponse.json({ status: 201, data: newTodo });
  } catch (error) {
    console.error("Error posting todo:", error);
    return NextResponse.json({
      status: 500,
      message: error.message || "Internal Server Error",
    });
  }
}
