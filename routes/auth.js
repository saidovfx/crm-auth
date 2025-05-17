const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const dotenv = require("dotenv");

dotenv.config();

router.post("/register", async (req, res) => {
  try {
    const { fullName, username, email, password, role, class: className, subject, createdBy } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "Bu email oldin ro'yxatdan o'tgan" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      fullName,
      username,
      email,
      password: hashedPassword,
      role: role || "student",
      class: className,
      subject,
      createdBy,
    });

    await newUser.save();

    res.status(201).json({ message: "Ro'yxatdan o'tish muvaffaqiyatli" });
  } catch (error) {
    res.status(500).json({ message: "Serverda xatolik yuz berdi", error: error.message });
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const { email, username, password } = req.body;

    let user;

    // Student faqat username bilan kirmoqchi
    if (username && !email) {
      user = await User.findOne({ username });
      if (!user) return res.status(400).json({ message: "Foydalanuvchi topilmadi" });
    } else if (email) {
      user = await User.findOne({ email });
      if (!user) return res.status(400).json({ message: "Email topilmadi" });
    } else {
      return res.status(400).json({ message: "Email yoki username kerak" });
    }

    // Parolni tekshirish
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Parol noto‘g‘ri" });

    // JWT token yaratish
    const payload = {
      userId: user._id,
      role: user.role,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1d" });

    res.json({ token, message: "Muvaffaqiyatli kirdingiz" });
  } catch (error) {
    res.status(500).json({ message: "Serverda xatolik yuz berdi", error: error.message });
  }
});

module.exports = router;
