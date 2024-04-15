const {
  Board,
  Column,
  Task,
  Tag,
  Attachment,
} = require("../models/board.model");

const getBoards = async (req, res) => {
  const user = req.user;
  try {
    const boards = await Board.find({ owner: user._id }).select(
      "-columns -tags"
    );

    return res.json({
      boards: boards,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error.",
    });
  }
};

const getBoard = async (req, res) => {
  const { boardId } = req.params;
  try {
    const board = await Board.findById(boardId).populate({
      path: "columns",
      populate: {
        path: "tasks",
        populate: "attachments",
      },
    });

    if (!board) {
      return res.status(422).json({
        success: false,
        message: "Board not found.",
      });
    }

    return res.json({
      board: board,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error.",
    });
  }
};

const createBoard = async (req, res) => {
  const user = req.user;
  const { name } = req.body;
  try {
    const newBoard = new Board({
      name: name,
      owner: user._id,
    });

    const savedBoard = await newBoard.save();

    return res.status(201).json({
      success: true,
      message: "Board has been created.",
      new_board: savedBoard,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error.",
    });
  }
};

const addColumn = async (req, res) => {
  const { boardId } = req.params;
  const { name } = req.body;
  try {
    const board = await Board.findById(boardId);

    if (!board) {
      return res.status(422).json({
        message: "Board not found.",
      });
    }

    const newColumn = new Column({
      name: name,
      board: boardId,
    });
    const savedCol = await newColumn.save();

    board.columns.push(savedCol._id);
    await board.save();

    return res.json({
      column: savedCol,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error.",
    });
  }
};

const addTag = async (req, res) => {
  const { boardId } = req.params;
  const { name } = req.body;
  try {
    const board = await Board.findById(boardId);

    if (!board) {
      return res.status(422).json({
        message: "Board not found.",
        board: boardId,
      });
    }

    const newTag = new Tag({
      name: name,
    });
    const savedTag = await newTag.save();

    board.tags.push(savedTag._id);
    await board.save();

    return res.json({
      tag: savedTag,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error.",
    });
  }
};

const addTask = async (req, res) => {
  const { columnId } = req.params;
  const { title, description } = req.body;
  try {
    const column = await Column.findById(columnId);

    if (!column) {
      return res.status(422).json({
        message: "Board not found.",
      });
    }

    const newTask = new Task({
      title: title,
      description: description,
      column: columnId,
    });
    const savedTask = await newTask.save();

    column.tasks.push(savedTask._id);
    await column.save();

    return res.json({
      task: savedTask,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error.",
    });
  }
};

const deleteTask = async (req, res) => {
  const { taskId } = req.params;
  try {
    await Task.findByIdAndDelete(taskId);
    return res.json({
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error.",
    });
  }
};

const deleteColumn = async (req, res) => {
  const { columnId } = req.params;
  try {
    await Column.findByIdAndDelete(columnId);
    return res.json({
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error.",
    });
  }
};

const deleteBoard = async (req, res) => {
  const { boardId } = req.params;
  try {
    await Board.findByIdAndDelete(boardId);
    return res.json({
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error.",
    });
  }
};

const updateTask = async (req, res) => {
  const { taskId } = req.params;
  const { title, description, boardId, tags } = req.body;
  try {
    const task = await Task.findById(taskId);
    task.title = title;
    task.description = description;
    await task.save();

    const board = await Board.findById(boardId);

    tags.forEach(async (tag) => {
      const foundTag = await Tag.findOne({ name: tag });
      if (!foundTag) {
        const newTag = new Tag({
          name: tag,
          board: boardId,
        });
        await newTag.save();

        board.tags.push(newTag._id);
        await board.save();

        task.tags.push(newTag._id);
        await task.save();
      }
    });

    return res.json({
      success: true,
      message: "Updated successfully.",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error.",
    });
  }
};

const moveTask = async (req, res) => {
  const { oldColumn, newColumn, taskId } = req.body;
  try {
    const task = await Task.findById(taskId);
    task.column = newColumn;
    await task.save();

    const updatedNewCol = await Column.findById(newColumn);
    updatedNewCol.tasks.push(taskId);
    await updatedNewCol.save();

    const updatedOldCol = await Column.findById(oldColumn);
    updatedOldCol.tasks.pull(taskId);
    await updatedOldCol.save();

    return res.json({
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error.",
    });
  }
};

const uploadAttachment = async (req, res) => {
  const { taskId } = req.params;
  const attachments = req.files;

  const task = await Task.findById(taskId);
  if (!task) {
    return res.status(422).json({
      message: "Task not found.",
    });
  }

  for (let i = 0; i < attachments.length; i++) {
    const file = attachments[i];
    const newAttachment = new Attachment({
      filename: file.filename,
      url:
        process.env.APP_URL +
        ":" +
        process.env.PORT +
        "/" +
        file.destination +
        file.filename,
      task: taskId,
    });
    await newAttachment.save();

    task.attachments.push(newAttachment._id);
    await task.save();
  }

  const newAttach = await Attachment.find({ task: task._id });
  return res.json({
    attachments: newAttach,
  });
};

module.exports = {
  getBoards,
  getBoard,
  createBoard,
  addColumn,
  addTag,
  addTask,
  updateTask,
  moveTask,
  uploadAttachment,
  deleteTask,
  deleteColumn,
  deleteBoard,
};
