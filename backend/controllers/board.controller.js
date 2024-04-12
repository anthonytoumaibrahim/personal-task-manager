const Board = require("../models/board.model");

const getBoards = async (req, res) => {
  return res.json({
    message: "hello world",
  });
};

const createBoard = async (req, res) => {
  const { user } = req;
  const { name } = req.body;
  try {
    // const newBoard = await Board.create();
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error.",
    });
  }
};

module.exports = { getBoards };
