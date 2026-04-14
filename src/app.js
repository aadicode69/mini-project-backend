const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const replicaRoutes = require("./routes/replicaRoutes")
const {compareReplicas} = require("./services/merkleService");
const repairRoutes = require("./routes/repairRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/replicas", replicaRoutes);
app.use("/api/repair", repairRoutes);

app.get("/", (req, res) => {
  res.json({
    status: "success",
    message: "API running",
    data: null
  });
});
app.get("/api/test-merkle", (req, res) => {
  const data1 = [
    { id: 1, val: "A" },
    { id: 2, val: "B" },
  ];

  const data2 = [
    { id: 1, val: "A" },
    { id: 2, val: "C" }
  ];

  const result = compareReplicas(data1, data2);

  res.json({
    status: "success",
    message: "Merkle comparison",
    data: result
  });
});

module.exports = app;