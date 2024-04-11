const mongoose = require("mongoose");

const connect = () => {
  mongoose.connect(process.env.MONGODB_URL);

  mongoose.connection.once("connected", () => {
    console.log("Connected to MongoDB.");
  });

  mongoose.connection.once("error", (err) => {
    console.log("Couldn't connect to MongoDB: ", err);
  });
};

module.exports = { connect };
