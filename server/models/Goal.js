const mongoose = require('mongoose');

const GoalSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  issuer: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['Planned', 'In Progress', 'Completed'],
    default: 'Planned',
  },
  date: {
    type: String,
  },
  skills: {
    type: [String],
    default: [],
  },
  credentialUrl: {
    type: String, 
    default: "", 
  },
  roadmap: [
    {
      label: String,
      isCompleted: { type: Boolean, default: false }
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model('Goal', GoalSchema);