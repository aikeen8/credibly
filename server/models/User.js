const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isVerified: { type: Boolean, default: false },
  verificationToken: { type: String },
  avatar: { type: String, default: "" },
  role: { type: String, default: "Student" },
  notifications: {
    expiringCertificates: { type: Boolean, default: true },
    goalDeadlines: { type: Boolean, default: true },
    weeklyInsights: { type: Boolean, default: false }
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', UserSchema);