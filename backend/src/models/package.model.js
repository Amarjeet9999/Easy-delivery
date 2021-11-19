const mongoose = require("mongoose");

const packageSchema = new mongoose.Schema({
  from: { type: String, required: true },
  to: { type: String, required: true },
  package: { type: String, required: true },
  image: { type: String, required: true },
  weight: { type: String, required: true },
});

module.exports = mongoose.model("package", packageSchema);
