const express = require("express");
const router = express.Router();
const User = require("../models/users.model");

router.get("/", async (req, res) => {
  try {
    let users = await User.find({}).lean().exec();
    return res.status(201).json({ data: users });
  } catch (err) {
    console.log(err);
    return res.status(400).send(err);
  }
});

module.exports = router;
