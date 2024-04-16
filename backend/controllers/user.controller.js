const { Board, Task, Column } = require("../models/board.model");

const getStatistics = async (req, res) => {
  const user = req.user;

  try {
    const dates = [];
    for (let i = 9; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      dates.push(date.toISOString().split("T")[0]);
    }

    const counts = {};

    dates.forEach((date) => {
      counts[date] = 0;
    });

    const boards = await Board.find({ owner: user._id }).populate({
      path: "columns",
      populate: {
        path: "tasks",
        match: {
          createdAt: { $gte: new Date(dates[8]), $lte: new Date() },
        },
      },
    });

    boards.forEach((board) => {
      board.columns.forEach((column) => {
        column.tasks.forEach((task) => {
          const taskDate = task.createdAt.toISOString().split("T")[0];
          if (counts.hasOwnProperty(taskDate)) {
            counts[taskDate]++;
          }
        });
      });
    });

    return res.json({
      labels: dates,
      counts: counts,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error.",
    });
  }

  // const boards = await Board.find({ owner: user._id }).populate({
  //   path: "columns",
  //   populate: {
  //     path: "tasks",
  //     match: { createdAt: { $lte: "" } }
  //   }
  // });
};

module.exports = { getStatistics };
