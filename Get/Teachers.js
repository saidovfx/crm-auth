const express = require("express");
const Teacher = require("../models/Teacher");
const router = express.Router();


router.get("/", async (req, res) => {
  try {
    const parent = await Teacher.find();
    res.json(parent);
  } catch (err) {
    res.status(500).json({ message: "Server xatolik", error: err.message });
  }
});

module.exports = router;
