import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./User";
import { boardsSlice } from "./Boards";
import { boardSlice } from "./Board";

export const store = configureStore({
  reducer: {
    userSlice: userSlice.reducer,
    boardsSlice: boardsSlice.reducer,
    boardSlice: boardSlice.reducer,
  },
});
