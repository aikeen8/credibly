const mongoose = require("mongoose");

const goalSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  status: { type: String, default: "Planned" },
  date: { type: String },
  issuer: { type: String, default: "Self-Paced" },
  skills: [{ type: String }],
  credentialUrl: { type: String },
  roadmap: [
    {
      title: { type: String },
      isCompleted: { type: Boolean, default: false }
    }
  ],
  isAutomated: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Goal", goalSchema);