const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const messageSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    message: { type: String, require: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Message = mongoose.model("message", messageSchema);
module.exports = Message;
