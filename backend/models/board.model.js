const mongoose = require("mongoose");

const taskSchema = mongoose.Schema(
  {
    title: String,
    description: {
      type: String,
      maxLength: 40,
    },
    column: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Column",
    },
  },
  {
    timestamps: true,
  }
);

const columnSchema = mongoose.Schema(
  {
    name: String,
    board: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Board",
    },
    tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Task" }],
  },
  {
    timestamps: true,
  }
);

const boardSchema = mongoose.Schema(
  {
    name: String,
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    columns: [{ type: mongoose.Schema.Types.ObjectId, ref: "Column" }],
  },
  {
    timestamps: true,
  }
);

const Task = mongoose.model("Task", taskSchema);
const Column = mongoose.model("Column", columnSchema);
const Board = mongoose.model("Board", boardSchema);

module.exports = {
  Board,
  Column,
  Task,
};
