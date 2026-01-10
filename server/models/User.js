const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  isVerified: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  role: { type: String, default: "Learner" },
  avatar: { type: String, default: "" }
});

module.exports = mongoose.model("User", userSchema);