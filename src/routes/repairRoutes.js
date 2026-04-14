const express = require("express");
const { startRepair } = require("../controllers/repairController");
const { protect, isAdmin } = require("../middlewares/authMiddleware");

const r = express.Router();

r.post("/start", protect, isAdmin, startRepair);

module.exports = r;