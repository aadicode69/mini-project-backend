const mongoose = require("mongoose");

const replicaSchema = new mongoose.Schema({
  name: String,
  uri: String,
  dbName: String,

  status: {
    type: String,
    enum: ["active", "inactive"],
    default: "active"
  },

  lastSync: Date,

  metadata: {
    host: String,
    region: String
  }

}, { timestamps: true });

module.exports = mongoose.model("Replica", replicaSchema);