const mongoose = require("mongoose");

const tagSchema = mongoose.Schema(
  {
    name: String,
  },
  {
    timestamps: true,
  }
);

const attachmentSchema = mongoose.Schema(
  {
    file: String,
    caption: String,
  },
  {
    timestamps: true,
  }
);

const taskSchema = mongoose.Schema(
  {
    title: String,
    description: {
      type: String,
      maxLength: 40,
    },
    attachments: [attachmentSchema],
    tags: [tagSchema],
  },
  {
    timestamps: true,
  }
);

const boardColumnSchema = mongoose.Schema(
  {
    name: String,
    tasks: [taskSchema],
  },
  {
    timestamps: true,
  }
);

const boardSchema = mongoose.Schema(
  {
    name: String,
    user_id: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    columns: [boardColumnSchema],
  },
  {
    timestamps: true,
  }
);

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
