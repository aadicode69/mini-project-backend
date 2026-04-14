const crypto = require("crypto");

const hashData = (data) => {
  return crypto
    .createHash("sha256")
    .update(JSON.stringify(data))
    .digest("hex");
};

module.exports = { hashData };