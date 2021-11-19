const mongoose = require("mongoose");
require("dotenv").config();

const DB = process.env.DB;

module.exports = () => {
  return mongoose.connect(DB);
};
