const mongoose = require("mongoose");

const boardSchema = mongoose.Schema({
  name: String,
  user_id: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
});

const boardColumnSchema = mongoose.Schema({
  name: String,
  board_id: {
    type: mongoose.Types.ObjectId,
    ref: "Board",
  },
});

const taskSchema = mongoose.Schema({
  title: String,
  description: {
    type: String,
    maxLength: 40,
  },
  boardColumn: {
    type: mongoose.Types.ObjectId,
    ref: "BoardColumn",
  },
});

const tagSchema = mongoose.Schema({
  name: String,
  task: {
    type: mongoose.Types.ObjectId,
    ref: "Task",
  },
});

const attachmentSchema = mongoose.Schema({
  file: String,
  caption: String,
  task: {
    type: mongoose.Types.ObjectId,
    ref: "Task",
  },
});

const Board = mongoose.model("Board", boardSchema);
const BoardColumn = mongoose.model("BoardColumn", boardColumnSchema);
const Task = mongoose.model("Task", taskSchema);
const Tag = mongoose.model("Tag", tagSchema);
const Attachment = mongoose.model("Attachment", attachmentSchema);

module.exports = {
  Board,
  BoardColumn,
  Task,
  Tag,
  Attachment,
};
