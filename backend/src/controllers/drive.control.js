const express = require("express");
const router = express.Router();
const Driver = require("../models/driver.model");

router.patch("/:id", async (req, res) => {
  try {
    let driver = await Driver.findById(req.params.id);

    driver.jobs = [...driver.jobs, req.body.jobs];

    driver = await Driver.findByIdAndUpdate(req.params.id, driver)
      .lean()
      .exec();
    return res.status(203).json({ data: driver });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

module.exports = router;
