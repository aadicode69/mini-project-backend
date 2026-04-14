const jwt = require("jsonwebtoken");
exports.protect = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.json({ status: "error", message: "No token", data: null });
    }
    const d = jwt.verify(token, process.env.JWT_SECRET);
    req.user = d;
    next();
  } catch (e) {
    res.json({ status: "error", message: "Invalid token", data: null });
  }
};
exports.isAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.json({ status: "error", message: "Admin only", data: null });
  }
  next();
};
