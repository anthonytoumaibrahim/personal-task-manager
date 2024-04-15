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
    setAttachments: (state, action) => {
      const { columnId, taskId, attachments } = action.payload;
      state.columns = state.columns.map((col) =>
        col._id === columnId
          ? {
              ...col,
              tasks: col.tasks.map((task) =>
                task._id === taskId
                  ? {
                      ...task,
                      attachments: attachments,
                    }
                  : task
              ),
            }
          : col
      );
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
    deleteTask: (state, action) => {
      const { columnId, taskId } = action.payload;

      state.columns = state.columns.map((col) =>
        col._id === columnId
          ? {
              ...col,
              tasks: col.tasks.filter((task) => task._id !== taskId),
            }
          : col
      );
    },
    deleteColumn: (state, action) => {
      const id = action.payload;
      state.columns = state.columns.filter((col) => col._id !== id);
    },
    changeTaskColumn: (state, action) => {
      const newColumn = action.payload.newColumn;
      const { _id, oldColumn } = action.payload.task;
      // Push task to new column
      state.columns
        .filter((col) => col._id === newColumn)?.[0]
        ?.tasks?.push(action.payload.task);

      // Remove task from old col
      state.columns = state.columns.map((col) =>
        col._id === oldColumn
          ? {
              ...col,
              tasks: col.tasks.filter((task) => task._id !== _id),
            }
          : col
      );
    },
  },
});

export const {
  setPost,
  addColumn,
  addTask,
  changeTaskColumn,
  deleteColumn,
  deleteTask,
  setAttachments,
  setBoard,
  updateTask,
} = boardSlice.actions;
