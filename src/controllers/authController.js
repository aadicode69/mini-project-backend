const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const ex = await User.findOne({ email });
    if (ex) {
      return res.json({ status: "error", message: "User exists", data: null });
    }

    const h = await bcrypt.hash(password, 10);

    const u = await User.create({
      name,
      email,
      password: h,
      role
    });

    res.json({
      status: "success",
      message: "User registered",
      data: u
    });
  } catch (e) {
    res.json({ status: "error", message: e.message, data: null });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const u = await User.findOne({ email });
    if (!u) {
      return res.json({ status: "error", message: "Invalid credentials", data: null });
    }

    const ok = await bcrypt.compare(password, u.password);
    if (!ok) {
      return res.json({ status: "error", message: "Invalid credentials", data: null });
    }

    const t = jwt.sign(
      { id: u._id, role: u.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      status: "success",
      message: "Login successful",
      data: { token: t }
    });
  } catch (e) {
    res.json({ status: "error", message: e.message, data: null });
  }
};