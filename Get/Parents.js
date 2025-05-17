const express = require("express");
const router = express.Router();
const Student = require("../models/Parent");

router.get("/", async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (err) {
    res.status(500).json({ message: "Server xatolik", error: err.message });
  }
});

module.exports = router;
