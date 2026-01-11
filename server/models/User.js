const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isOnboarded: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  role: { type: String, default: "Achiever" }, 
  avatar: { type: String, default: "" }
});

module.exports = mongoose.model("User", userSchema);