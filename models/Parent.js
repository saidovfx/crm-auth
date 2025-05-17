const mongoose = require("mongoose");

const parentSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  parentOf: { type: String, required: true },
  addedBy: { type: String },
  role: { type: String, default: "parent"},
})

module.exports = mongoose.model("Parents", parentSchema);
