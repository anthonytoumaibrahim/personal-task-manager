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
        .filter((column) => column._id === action.payload.id)?.[0]
        ?.tasks?.push(action.payload.task);
    },
    updateTask: (state, action) => {
      return {
        ...state,
        columns: state.columns.map((column) =>
          column._id === action.payload.id
            ? {
                ...column,
                tasks: column.tasks.map((task) =>
                  task._id === action.payload.taskId
                    ? {
                        ...task,
                        ...action.payload.data,
                      }
                    : task
                ),
              }
            : column
        ),
      };
    },
  },
});

export const { setPost } = boardSlice.actions;
