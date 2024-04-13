import { createSlice } from "@reduxjs/toolkit";

const initState = {};

export const boardSlice = createSlice({
  name: "boardSlice",
  initialState: initState,
  reducers: {
    setBoard: (state, action) => {
      return action.payload;
    },
    addColumn: (state, action) => {
      state.columns.push(action.payload);
    },
    addTask: (state, action) => {
      state.columns
        .filter((board) => board._id === action.payload.id)?.[0]
        ?.tasks?.push(action.payload.task);
    },
  },
});

export const { setPost } = boardSlice.actions;
