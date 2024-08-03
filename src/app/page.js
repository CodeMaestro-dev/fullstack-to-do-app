"use client";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { createTodo, todos } from "@/lib/features/crudOperations";
import StartToastifyInstance from "toastify-js";

export default function Home() {
  const [todo, setTodo] = useState("");
  const dispatch = useDispatch();
  const { response } = useSelector(todos);

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(createTodo(todo));
    setTodo("");

    if(todo == "") {
      showErrorToast("You can't have an empty todo")
      return;
    }

    if (response.status === 201) {
      showToast("Todo has been added successfully");
    }

    if (response.status === 400) {
      showErrorToast(response.error );
    }
  }

  function showToast(toastMessage) {
    StartToastifyInstance({
      text: toastMessage,
      className: "fixed z-20 p-4 top-5 right-5 flex gap-3 text-tertiary text-white",
      duration: 3000,
      destination: "https://github.com/apvarun/toastify-js",
      newWindow: true,
      close: true,
      gravity: "top",
      position: "left",
      stopOnFocus: true,
      style: {
        background: "linear-gradient(to right, #8A2BE2,  #8A2BA2)",
      },
    }).showToast();
  }

  function showErrorToast(toastMessage) {
    StartToastifyInstance({
      text: toastMessage,
      className: "fixed z-20 p-4 top-5 right-5 flex gap-3 text-tertiary text-white bg-todo-red",
      duration: 3000,
      destination: "https://github.com/apvarun/toastify-js",
      newWindow: true,
      close: true,
      gravity: "top",
      position: "left",
      stopOnFocus: true,
    }).showToast();
  }

  return (
    <main className="p-8 flex justify-center">
      <form
        className="flex flex-col gap-8 w-full md:w-[600px] mt-20"
        onSubmit={handleSubmit}
      >
        <textarea
          name="todo"
          id="todo"
          className="bg-todo-light-black rounded-md h-[60px] text-white p-2"
          onInput={(e) => {
            setTodo(e.target.value);
          }}
          value={todo}
        />
        <input
          type="submit"
          value="Create Todo"
          className="uppercase bg-todo-purple p-2 rounded-md text-white cursor-pointer"
        />
      </form>
    </main>
  );
}
