const express = require("express");
const router = express.Router();
const {
  getBoards,
  getBoard,
  createBoard,
  addColumn,
} = require("../controllers/board.controller");

router.get("/", getBoards);
router.get("/:boardId", getBoard);
router.post("/:boardId/add-column", addColumn);
router.post("/", createBoard);

module.exports = router;
