const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, "Full name is required."],
    },
    email: {
      type: String,
      unique: true,
      validate: [
        (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
        "Please enter a valid email address.",
      ],
      required: [true, "Email address is required."],
    },
    password: {
      type: String,
      minLength: [8, "Password needs to be at least 8 characters long."],
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next, options) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  return next();
});

userSchema.method("comparePassword", async function (password) {
  return await bcrypt.compare(password, this.password);
});

const User = mongoose.model("User", userSchema);

module.exports = User;
