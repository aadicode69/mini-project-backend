const express = require("express");
const { register, login } = require("../controllers/authController");

const r = express.Router();

r.post("/register", register);
r.post("/login", login);

module.exports = r;