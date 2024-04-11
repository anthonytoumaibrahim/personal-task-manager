require("dotenv").config();

// Express
const express = require("express");
const app = express();
app.use(express.json());

// MongoDB
const { connect } = require("./config/mongoDb.config");

// Routes
// const userRouter = require("./routes/user.routes");
// app.use("/users", userRouter);

const authRouter = require("./routes/auth.routes");
app.use("/auth", authRouter);

// Server
const port = process.env.PORT;
app.listen(port, (err) => {
  if (err) throw err;
  console.log("Server is running on port " + port);
  connect();
});
