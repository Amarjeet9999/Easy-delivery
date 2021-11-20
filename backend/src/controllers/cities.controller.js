const express = require("express");

const router = express.Router();
const City = require("../models/cities.model");

router.get("/cities", async (req, res) => {
  try {
    let city = await City.find({}).lean().exec();
    return res.status(201).json({ data: city.city });
  } catch (error) {
    return res.status(400).send(err);
  }
});
