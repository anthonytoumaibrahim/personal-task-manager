import { createSlice } from "@reduxjs/toolkit";
import {
  getLocalUser,
  setLocalUser,
  removeLocalUser,
} from "../../core/tools/local/user";

const initState = {
  token: getLocalUser()?.token ?? null,
};

export const userSlice = createSlice({
  name: "userSlice",
  initialState: initState,
  reducers: {
    addUser: (state, action) => {
      state.token = action.payload.token;
      setLocalUser(state);
    },
    removeUser: (state, action) => {
      state.token = null;
      removeLocalUser();
    },
  },
});

export const { addUser, removeUser } = userSlice.actions;
