const express = require("express");
const router = express.Router();
const Message = require("../models/message.model");

router.get("/", async (req, res) => {
  try {
    let message = await Message.find({}).lean().exec();
    return res.status(203).json({ data: message });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

router.post("/", async (req, res) => {
  try {
    let message = await Message.create(req.body);
    return res.status(203).json({ data: message });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    let message = await Message.findByIdAndDelete(req.params.id);
    return res.status(203).json({ data: message });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

module.exports = router;
