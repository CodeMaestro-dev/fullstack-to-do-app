import { NextRequest, NextResponse } from "next/server";
import Todo from "@/model/todoModel";

export async function PATCH(req) {
  try {
    const url = new URL(req.url);
    const id = url.pathname.split("/").pop();
    if (!id) {
      return NextResponse.json({ status: 400, message: "ID is required" });
    }

    const completeTodo = await Todo.findByIdAndUpdate(
      id,
      {
        completed: true,
      },
      {
        new: true,
      }
    );

    if (!completeTodo) {
      return NextResponse.json({ status: 404, message: "Todo not found" });
    }

    return NextResponse.json({ status: 200, data: completeTodo });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ status: 500, message: "Internal Server Error" });
  }
}
