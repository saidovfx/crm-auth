const express = require('express');
const router = express.Router();
const User = require('../models/Student');
const bcrypt = require('bcryptjs');

router.post('/', async (req, res) => {
  const { fullName, username, password, studentClass, addedBy } = req.body;

  if (!fullName || !username || !password || !studentClass) {
    return res.status(400).json({ message: "Barcha maydonlarni to‘ldiring" });
  }

  const existing = await User.findOne({ username });
  if (existing) return res.status(400).json({ message: "Username band" });

  const hashedPassword = await bcrypt.hash(password, 10);
  const newStudent = new User({
    fullName,
    username,
    password: hashedPassword,
    role: 'student',
    studentClass,
    addedBy
  });

  await newStudent.save();
  res.status(201).json({ message: "Student ro‘yxatdan o‘tdi" });
});

module.exports = router;
