"use client";
import Todo from "../components/Todo";
import { useDispatch, useSelector } from "react-redux";
import {
  completeTodo,
  deleteTodo,
  editTodo,
  getTodo,
  todos,
} from "@/lib/features/crudOperations";
import { useEffect, useState } from "react";
import StartToastifyInstance from "toastify-js";

export default function AddTodo() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [editedValue, setEditedValue] = useState("");
  const [editId, setEditId] = useState("");
  const dispatch = useDispatch();
  const { status, error, todoItems, response } = useSelector(todos);
  useEffect(() => {
    dispatch(getTodo());
  }, [dispatch]);

  if (status === "loading" || status === "idle") {
    return (
      <div className="p-8">
        <p className="text-white">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8">
        <p className="text-todo-red">Error: {error}</p>
      </div>
    );
  }

  function handleEdit(e) {
    setEditId(e.target.closest("li").id);
    setModalOpen(true);
  }

  function handleEditValue(value) {
    setEditedValue(value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(editTodo({ editedValue, editId }));
    if (response.status === 200) {
      showToast("Todo edited successfully");
    }

    if (response.status === 400 || response.status === 404) {
      showErrorToast(response.message);
    }
  }

  function handleDelete(e) {
    dispatch(deleteTodo(e.target.closest("li").id));

    if (response.status === 200) {
      showToast("Todo deleted successfully");
    }

    if (response.status === 400 || response.status === 404) {
      showErrorToast(response.message);
    }
  }

  function handleComplete(e) {
    dispatch(completeTodo(e.target.closest("li").id));
    

    if (response.status === 200) {
      showToast("Todo marked as completed successfully");
    }

    if (response.status === 400 || response.status === 404) {
      showErrorToast(response.message);
    }
  }

  function showToast(toastMessage) {
    StartToastifyInstance({
      text: toastMessage ,
      className: "fixed z-20 p-4 top-5 right-5 flex gap-3 text-white",
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
      className:
        "fixed z-20 p-4 top-5 right-5 flex gap-3 text-tertiary text-white bg-todo-red",
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
    <main className="p-8">
      {isModalOpen ? (
        <div className="fixed inset-0 backdrop-blur-sm w-screen h-screen z-50 flex items-center justify-center">
          <form
            className="flex flex-col gap-5 w-[600px] bg-white p-5 rounded-lg shadow-lg"
            onSubmit={handleSubmit}
          >
            <div
              className="border border-secondary cursor-pointer rounded-full p-2 w-fit text-primary"
              onClick={() => setModalOpen(false)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            </div>
            <input
              name="to-do"
              id="to-do"
              className="text-white bg-todo-light-black px-3 py-2 focus:border focus:border-secondary focus:outline-none rounded-md"
              onInput={(e) => setEditedValue(e.target.value)}
              value={editedValue}
            />
            <button className="rounded-md bg-todo-purple text-white px-3 py-2 uppercase">
              Edit
            </button>
          </form>
        </div>
      ) : (
        <></>
      )}
      <p className="text-white my-5 md:text-left text-center">
        Note: Red circle mean{" "}
        <span className="text-todo-red">&apos;Not Completed&apos;</span> while
        Green Circle{" "}
        <span className="text-todo-green">&apos;Completed&apos;</span>
      </p>
      <ul className="flex flex-col gap-5">
        {todoItems && todoItems.lenght != 0 ? (
          todoItems.data.map((todo, index) => (
            <Todo
              key={index}
              id={todo._id}
              todo={todo.todo}
              completed={todo.completed}
              handleEdit={(e) => {
                handleEdit(e);
                handleEditValue(todo.todo);
              }}
              handleDelete={(e) => {
                handleDelete(e);
              }}
              handleComplete={(e) => {
                handleComplete(e);
              }}
            />
          ))
        ) : (
          <p className="text-white">There aren&apos;t any todos yet</p>
        )}
      </ul>
    </main>
  );
}
