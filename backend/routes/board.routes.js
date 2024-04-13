const express = require("express");
const router = express.Router();
const {
  getBoards,
  getBoard,
  createBoard,
  addColumn,
  addTag,
  addTask,
  updateTask,
} = require("../controllers/board.controller");

router.get("/", getBoards);
router.post("/", createBoard);
router.get("/:boardId", getBoard);
router.post("/:boardId/add-column", addColumn);
router.post("/:boardId/add-tag", addTag);
router.post("/:columnId/add-task", addTask);
router.post("/:taskId/update-task", updateTask);

module.exports = router;
