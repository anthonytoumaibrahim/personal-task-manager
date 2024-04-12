const { Board, BoardColumn, Task } = require("../models/board.model");

const getBoards = async (req, res) => {
  const { _id } = req.user;
  try {
    const boards = await Board.find({ user_id: _id });

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
      populate: "board_id",
    });
    if (!board) {
      return res.status(422).json({
        message: "Board not found.",
      });
    }

    return res.json({
      board: board,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error.",
    });
  }
};

const createBoard = async (req, res) => {
  const { _id } = req.user;
  const { name } = req.body;
  try {
    const newBoard = await Board.create({
      name: name,
      user_id: _id,
    });
    return res.status(201).json({
      success: true,
      message: "Board has been created.",
      new_board: newBoard,
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

    const newColumn = new BoardColumn({
      name: name,
    });
    await newColumn.save();

    board.columns.push(newColumn);
    await board.save();

    return res.json({
      column: newColumn,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error.",
    });
  }
};

const addTask = async (req, res) => {
  const { columnId } = req.params;
  const { title, description } = req.body;
  try {
    const boardColumn = await BoardColumn.findById(columnId);

    if (!boardColumn) {
      return res.status(422).json({
        message: "Board column not found.",
      });
    }

    const newTask = new Task({
      title: title,
      description: description,
    });
    await newTask.save();

    boardColumn.tasks.push(newTask);
    await boardColumn.save();

    return res.json({
      task: newTask,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error.",
    });
  }
};

module.exports = { getBoards, getBoard, createBoard, addColumn, addTask };
