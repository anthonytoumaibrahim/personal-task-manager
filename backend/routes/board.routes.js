const express = require("express");
const router = express.Router();
const { getBoards, createBoard } = require("../controllers/board.controller");

router.get("/", getBoards);
router.post("/", createBoard);

module.exports = router;
