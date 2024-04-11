const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = mongoose.Schema(
  {
    fullName: {
      type: String,
      require: "Full name is required.",
    },
    email: {
      type: String,
      unique: true,
      validate: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
      require: "Email address is required.",
    },
    password: {
      type: String,
      validate: (value) => value.length >= 8,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", function (next, options) {
  if (this.isModified("password")) {
    this.password = bcrypt.hash(this.password, 10);
  }
  return next();
});

userSchema.methods.comparePassword = function (password) {
  return bcrypt.compare(password, this.password);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
