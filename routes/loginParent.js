const express = require('express');
const router = express.Router();
const User = require('../models/Parent');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.post('/', async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });
  if (!user) return res.status(404).json({ message: "Foydalanuvchi topilmadi" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ message: "Noto‘g‘ri parol" });

  const token = jwt.sign(
    { id: user._id, role: user.role, username: user.username },
    process.env.JWT_SECRET,
    { expiresIn: '1d' }
  );

  res.status(200).json({
    message: "Kirish muvaffaqiyatli",
    token,
    user: {
      username: user.username,
      role: user.role,
      fullName: user.fullName,
      parentOf: user.parentOf
 
    }
  });
});

module.exports = router;
