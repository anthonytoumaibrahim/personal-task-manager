const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({
        message: "Unauthenticated",
      });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ _id: decoded._id });
    if (decoded) {
      req.user = user;
      next();
    }
  } catch (e) {
    return res.status(401).json({
      message: "Internal Server Error.",
    });
  }
};

module.exports = authMiddleware;
