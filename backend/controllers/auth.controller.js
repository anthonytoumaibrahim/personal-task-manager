const User = require("../models/user.model");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(422).json({
        message: "This account doesn't exist.",
      });
    }

    const isValidPassword = await user.comparePassword(password);
    if (!isValidPassword) {
      return res.status(422).json({
        message: "Invalid credentials.",
      });
    }

    const token = jwt.sign({ _id: user.id }, process.env.JWT_SECRET);

    return res.status(200).json({
      user,
      token,
    });
  } catch (error) {
    return res.status(500).json(error);
  }
};

const register = async (req, res) => {
  const { fullName, email, password } = req.body;
  try {
    const userExists = await User.findOne({ email: email });
    if (userExists) {
      return res.status(422).json({
        message: "You already have an account. Try logging in instead!",
      });
    }

    const newUser = await User.create({
      fullName: fullName,
      email: email,
      password: password,
    });

    // JWT
    const token = jwt.sign({ _id: newUser.id }, process.env.JWT_SECRET);

    return res.status(201).json({
      user: newUser,
      token: token,
    });
  } catch (error) {
    return res.status(500).json(error);
  }
};

module.exports = { login, register };
