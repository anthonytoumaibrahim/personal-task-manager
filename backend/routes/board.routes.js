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
  deleteTask,
  deleteColumn,
} = require("../controllers/board.controller");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "_" + file.originalname);
  },
});

const upload = multer({ storage: storage, dest: "uploads/" });

router.get("/", getBoards);
router.post("/", createBoard);
router.get("/:boardId", getBoard);
router.post("/:boardId/add-column", addColumn);
router.post("/:boardId/add-tag", addTag);
router.post("/:columnId/add-task", addTask);
router.post("/:taskId/update-task", updateTask);
router.delete("/task/:taskId", deleteTask);
router.delete("/:columnId", deleteColumn);
router.post("/move-task", moveTask);
router.post(
  "/:taskId/upload-attachment",
  upload.array("attachments", 5),
  uploadAttachment
);

module.exports = router;
