require("dotenv").config();

// Express
const express = require("express");
const app = express();
app.use(express.json());
const cors = require("cors");
app.use(cors());

// MongoDB
const { connect } = require("./config/mongoDb.config");

// Static files
app.use("/uploads", express.static("uploads"));

// Routes
const authRouter = require("./routes/auth.routes");
app.use("/auth", authRouter);

const authMiddleware = require("./middlewares/auth.middleware");

const userRouter = require("./routes/user.routes");
app.use("/user", authMiddleware, userRouter);

const boardRouter = require("./routes/board.routes");
app.use("/board", authMiddleware, boardRouter);

// Server
const port = process.env.PORT;
app.listen(port, (err) => {
  if (err) throw err;
  console.log("Server is running on port " + port);
  connect();
});
