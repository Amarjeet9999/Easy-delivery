const express = require("express");

const router = express.Router();
const City = require("../models/cities.model");

router.get("/", async (req, res) => {
  try {
    let city = await City.find({}).lean().exec();
    return res.status(201).json({ data: city });
  } catch (error) {
    return res.status(400).send(err);
  }
});

router.get("/:city", async (req, res) => {
  try {
    let cities = await City.findOne(req.params.city).lean().exec();
    return res.status(200).json({ data: cities });
  } catch (error) {
    return res.status(401).json({ error: error.message });
  }
});
module.exports = router;
