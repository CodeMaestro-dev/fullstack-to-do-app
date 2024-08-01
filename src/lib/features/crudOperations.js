import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const createTodo = createAsyncThunk(
  "todoOperations/create",
  async (todo) => {
    try {
      const response = await axios.post("/api/todo", {
        todo: todo,
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error) {
      return error.message;
    }
  }
);

export const getTodo = createAsyncThunk("todoOperations/get", async (todo) => {
  try {
    const response = await axios.get("/api/todos");
    return response.data;
  } catch (error) {
    return error.message;
  }
});

export const editTodo = createAsyncThunk(
  "todoOperations/edit",
  async (change) => {
    try {
      const response = await axios.patch(`/api/todos/${change.editId}`, {
        todo: change.editedValue,
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error) {
      return error.message;
    }
  }
);

export const deleteTodo = createAsyncThunk(
  "todoOperations/delete",
  async (id) => {
    try {
      const response = await axios.delete(`/api/todo/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error) {
      return error.message;
    }
  }
);

export const completeTodo = createAsyncThunk(
  "todoOperations/complete",
  async (id) => {
    try {
      const response = await axios.patch(`/api/complete/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error) {
      return error.message;
    }
  }
);

const crudOperations = createSlice({
  name: "crudTodo",
  initialState: {
    todoItems: null,
    status: "idle",
    error: null,
    response: "none",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createTodo.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createTodo.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.response = action.payload;
      })
      .addCase(createTodo.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(getTodo.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getTodo.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.todoItems = action.payload;
      })
      .addCase(getTodo.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(editTodo.pending, (state) => {
        state.status = "loading";
      })
      .addCase(editTodo.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.response = action.payload;
      })
      .addCase(editTodo.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(deleteTodo.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.response = action.payload;
      })
      .addCase(deleteTodo.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(completeTodo.pending, (state) => {
        state.status = "loading";
      })
      .addCase(completeTodo.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.response = action.payload;
      })
      .addCase(completeTodo.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const todos = (state) => state.crudTodo;
export default crudOperations.reducer;
