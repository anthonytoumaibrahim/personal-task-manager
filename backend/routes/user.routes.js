const express = require("express");

const router = express.Router();

const { getStatistics } = require("../controllers/user.controller");

router.get("/statistics", getStatistics);

module.exports = router;
