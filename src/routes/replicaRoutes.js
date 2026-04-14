const express = require("express");
const {
  addReplica,
  getReplicas,
  deleteReplica
} = require("../controllers/replicaController");

const { protect, isAdmin } = require("../middlewares/authMiddleware");

const r = express.Router();

r.post("/add", protect, isAdmin, addReplica);
r.get("/", protect, getReplicas);
r.delete("/:id", protect, isAdmin, deleteReplica);

module.exports = r;