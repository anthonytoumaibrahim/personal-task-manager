const express = require("express");
const router = express.Router();
const { getBoards } = require("../controllers/board.controller");

router.get("/", getBoards);
router.post("/", );

module.exports = router;
