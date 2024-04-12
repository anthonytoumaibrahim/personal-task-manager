import { createSlice } from "@reduxjs/toolkit";

const initState = [];

export const boardsSlice = createSlice({
  name: "boardsSlice",
  initialState: initState,
  reducers: {
    setBoards: (state, action) => {
      return action.payload;
    },
    addBoard: (state, action) => {
      return [...state, action.payload];
    },
  },
});

export const { setBoards } = boardsSlice.actions;
