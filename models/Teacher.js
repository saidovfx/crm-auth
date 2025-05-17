const mongoose = require("mongoose");

const teacherSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  subject: { type: String, required: true },
  addedBy: { type: String },
  role: { type: String, default: "teacher"},
});

module.exports = mongoose.model("Teacher", teacherSchema);
