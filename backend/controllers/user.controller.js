const { Board, Task } = require("../models/board.model");

const getStatistics = async (req, res) => {
  const user = req.user;

  const boardCount = await Board.find({ owner: user._id }).count();

  const taskCount = await Task.count();
  
  return res.json({
    labels: [],
    counts: {
      boards: boardCount,
    },
  });
};

module.exports = { getStatistics };
