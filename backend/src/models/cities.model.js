const mongoose = require("mongoose");

const citySchema = new mongoose.Schema(
  {
    city: { type: String, required: true },
    lat: { type: String },
    lng: { type: String },
    country: { type: String },
    iso2: { type: String, default: "IN" },
    admin_name: { type: String },
    capital: { type: String },
    population: { type: String },
    population_proper: { type: String },
  },
  {
    versionKey: false,
    timeStamps: true,
  }
);

const City = mongoose.model("city", citySchema);
module.exports = City;
