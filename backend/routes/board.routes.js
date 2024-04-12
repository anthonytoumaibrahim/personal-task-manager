const express = require("express");
const router = express.Router();
const {
  getBoards,
  getBoard,
  createBoard,
  addColumn,
  addTask,
} = require("../controllers/board.controller");

router.get("/", getBoards);
router.get("/:boardId", getBoard);
router.post("/", createBoard);
router.post("/:boardId/add-column", addColumn);
router.post("/:columnId/add-task", addTask);

module.exports = router;
