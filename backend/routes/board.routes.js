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
  moveTask,
  uploadAttachment,
} = require("../controllers/board.controller");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

router.get("/", getBoards);
router.post("/", createBoard);
router.get("/:boardId", getBoard);
router.post("/:boardId/add-column", addColumn);
router.post("/:boardId/add-tag", addTag);
router.post("/:columnId/add-task", addTask);
router.post("/:taskId/update-task", updateTask);
router.post("/move-task", moveTask);
router.post(
  "/:taskId/upload-attachment",
  upload.array("files", 5),
  uploadAttachment
);

module.exports = router;
