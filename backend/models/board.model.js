const mongoose = require("mongoose");

const boardSchema = mongoose.Schema({
  name: String,
});

const taskSchema = mongoose.Schema({
  title: String,
  description: {
    type: String,
    maxLength: 155,
  },
  board: {
    type: mongoose.Types.ObjectId,
    ref: "Board",
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
const Task = mongoose.model("Task", taskSchema);
const Tag = mongoose.model("Tag", tagSchema);
const Attachment = mongoose.model("Attachment", attachmentSchema);

module.exports = {
  Board,
  Task,
  Tag,
  Attachment,
};
