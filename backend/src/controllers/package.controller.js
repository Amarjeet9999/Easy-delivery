const express = require("express");
const router = express.Router();
const Package = require("../models/package.model");

router.post("/", async (req, res) => {
  try {
    const package = await Package.create(req.body);
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
    let package = await Package.find({ _id: req.params.id })
      .populate("driverId")
      .lean()
      .exec();
    return res.status(203).json({ data: package });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

router.patch("/:id", async (req, res) => {
  try {
    let package = await Package.findById(req.params.id);
    package.status = !package.status;
    package.driverId = [req.body.driverId];

    package = await Package.findByIdAndUpdate(req.params.id, package)
      .lean()
      .exec();
    return res.status(203).json({ data: package });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

module.exports = router;
