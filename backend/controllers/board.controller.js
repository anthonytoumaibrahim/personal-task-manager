const { Board } = require("../models/board.model");

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
      id: newBoard.id,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error.",
    });
  }
};

module.exports = { getBoards, createBoard };
