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
  },
});

export const { setPost } = boardSlice.actions;
