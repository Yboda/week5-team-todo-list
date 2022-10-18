import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  todos: [],
  isLoading: false,
  error: null,
};

export const __getTodos = createAsyncThunk(
  "getTodos",
  async (payload, thunkAPI) => {
    try {
      const data = await axios.get("http://localhost:3001/todos");
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __delTodos = createAsyncThunk(
  "delTodos",
  async (payload, thunkAPI) => {
    try {
      await axios.delete(`http://localhost:3001/todos/${payload}`);
      return thunkAPI.fulfillWithValue(payload);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getTodosSlice = createSlice({
  name: "getTodos",
  initialState,
  reducers: {},
  extraReducers: {
    [__getTodos.pending]: (state) => {
      state.isLoading = true;
    },
    [__getTodos.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.todos = action.payload;
    },
    [__getTodos.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [__delTodos.pending]: (state) => {
      state.isLoading = true;
    },
    [__delTodos.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },
    [__delTodos.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const {} = getTodosSlice.actions;
export default getTodosSlice.reducer;
