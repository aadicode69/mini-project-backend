const Replica = require("../models/Replica");

exports.addReplica = async (req, res) => {
  try {
    const r = await Replica.create(req.body);

    res.json({
      status: "success",
      message: "Replica added",
      data: r
    });
  } catch (e) {
    res.json({ status: "error", message: e.message, data: null });
  }
};

exports.getReplicas = async (req, res) => {
  try {
    const r = await Replica.find();

    res.json({
      status: "success",
      message: "Replica list",
      data: r
    });
  } catch (e) {
    res.json({ status: "error", message: e.message, data: null });
  }
};

exports.deleteReplica = async (req, res) => {
  try {
    await Replica.findByIdAndDelete(req.params.id);

    res.json({
      status: "success",
      message: "Replica deleted",
      data: null
    });
  } catch (e) {
    res.json({ status: "error", message: e.message, data: null });
  }
};