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
    removeBoard: (state, action) => {
      return state.filter((board) => board._id !== action.payload);
    },
  },
});

export const { setBoards, addBoard, removeBoard } = boardsSlice.actions;
