const express = require("express");
const router = express.Router();
const Driver = require("../models/driver.model");

router.patch("/:id", async (req, res) => {
  try {
    // console.log("HEllo");
    let driver = await Driver.findById(req.params.id).lean().exec();
    // console.log("Driver", driver);

    driver.jobs = [...driver.jobs, req.body.jobs];
    // console.log("Body Jobs", req.body.jobs);

    // console.log("After", driver);

    driver = await Driver.findByIdAndUpdate(req.params.id, driver)
      .lean()
      .exec();
    return res.status(203).json({ data: driver });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

router.patch("/remove/:id", async (req, res) => {
  try {
    let driver = await Driver.findById(req.params.id).lean().exec();
    driver = JSON.parse(JSON.stringify(driver));
    console.log(typeof driver);

    for (let i = 0; i < driver.jobs.length; i++) {
      console.log(driver.jobs[i]);
      if (driver.jobs[i] === req.body.jobs[0]) {
        driver.jobs.splice(i, 1);
        console.log("matched");
      }
    }

    driver = await Driver.findByIdAndUpdate(req.params.id, driver)
      .lean()
      .exec();

    return res.status(203).json({ data: driver });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});


router.get("/:id", async (req, res) => {
  try {
    let driver = await Driver.find({ _id: req.params.id })
      .populate("jobs")
      .lean()
      .exec();
    return res.status(203).json({ data: driver });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

module.exports = router;
