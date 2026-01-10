const mongoose = require('mongoose');

const GoalSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: { type: String, required: true },
  issuer: { type: String, default: "Self-Paced" },
  status: { type: String, default: "Planned" },
  date: { type: String },
  skills: [String],
  credentialUrl: { type: String },
  roadmap: [
      {
          title: String,
          isCompleted: { type: Boolean, default: false }
      }
  ],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Goal', GoalSchema);