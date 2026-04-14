const { runRepair } = require("../services/repairService");

exports.startRepair = async (req, res) => {
  const result = await runRepair();

  res.json({
    status: "success",
    message: "Repair executed",
    data: result
  });
};