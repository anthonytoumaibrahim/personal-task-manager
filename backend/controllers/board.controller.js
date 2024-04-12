const { Board, Column, Task } = require("../models/board.model");

const getBoards = async (req, res) => {
  const user = req.user;
  try {
    const boards = await Board.find({ owner: user._id });

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
    const board = await Board.findById(boardId).populate("columns");

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

module.exports = { getBoards, getBoard, createBoard, addColumn };
