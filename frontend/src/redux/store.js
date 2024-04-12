import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./User";
import { boardsSlice } from "./Boards";

export const store = configureStore({
  reducer: {
    userSlice: userSlice.reducer,
    boardsSlice: boardsSlice.reducer,
  },
});
