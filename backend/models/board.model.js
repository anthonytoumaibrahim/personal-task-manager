const mongoose = require("mongoose");

const attachmentSchema = mongoose.Schema(
  {
    filename: String,
    url: {
      type: String,
      required: true,
    },
    task: { type: mongoose.Schema.Types.ObjectId, ref: "Task" },
  },
  {
    timestamps: true,
  }
);

const tagSchema = mongoose.Schema({
  name: {
    type: String,
    maxLength: 30,
  },
  task: { type: mongoose.Schema.Types.ObjectId, ref: "Task" },
});

const taskSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      maxLength: 40,
    },
    description: {
      type: String,
      maxLength: 150,
    },
    column: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Column",
    },
    attachments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Attachment" }],
    tags: [{ type: mongoose.Schema.Types.ObjectId, ref: "Tag" }],
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

const Tag = mongoose.model("Tag", tagSchema);
const Attachment = mongoose.model("Attachment", attachmentSchema);
const Task = mongoose.model("Task", taskSchema);
const Column = mongoose.model("Column", columnSchema);
const Board = mongoose.model("Board", boardSchema);

module.exports = {
  Board,
  Column,
  Task,
  Attachment,
  Tag,
};
