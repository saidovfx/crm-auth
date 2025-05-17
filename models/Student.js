const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  studentClass: { type: String, required: true },
  addedBy: { type: String },
  role: { type: String, default: "student" },
});

module.exports = mongoose.model("Student", studentSchema);
