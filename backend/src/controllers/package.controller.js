const express = require("express");
const router = express.Router();
const Package = require("../models/package.model");

router.post("/", async (req, res) => {
  try {
    let package = await Package.create(req.body);
    return res.status(201).json({ data: package });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

router.get("/", async (req, res) => {
  try {
    let package = await Package.find({}).lean().exec();
    return res.status(201).json({ data: package });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const package = await Package.findById(req.params.id).lean().exec();
    return res.status(200).json({ data: package });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

module.exports = router;
