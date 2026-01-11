const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const Goal = require('../models/Goal');

router.get('/', auth, async (req, res) => {
  try {
    const goals = await Goal.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(goals);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

router.post('/', auth, async (req, res) => {
  try {
    const { title, status, date, skills, roadmap, isAutomated } = req.body;

    const newGoal = new Goal({
      user: req.user.id,
      title,
      status,
      date,
      skills,
      roadmap,
      isAutomated: isAutomated || false
    });

    const goal = await newGoal.save();
    res.json(goal);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

router.put('/:id', auth, async (req, res) => {
  try {
    let goal = await Goal.findById(req.params.id);
    if (!goal) return res.status(404).json({ message: "Goal not found" });

    if (goal.user.toString() !== req.user.id) {
      return res.status(401).json({ message: "Not authorized" });
    }

    const { title, issuer, status, date, skills, credentialUrl, roadmap } = req.body;

    if (title) goal.title = title;
    if (issuer) goal.issuer = issuer;
    if (status) goal.status = status;
    if (date) goal.date = date;
    if (skills) goal.skills = skills;
    if (credentialUrl) goal.credentialUrl = credentialUrl;
    if (roadmap) goal.roadmap = roadmap;

    await goal.save();
    res.json(goal);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

router.delete('/:id', auth, async (req, res) => {
    try {
        let goal = await Goal.findById(req.params.id);
        if (!goal) return res.status(404).json({ message: "Goal not found" });
    
        if (goal.user.toString() !== req.user.id) {
          return res.status(401).json({ message: "Not authorized" });
        }
    
        await goal.deleteOne();
        res.json({ message: "Goal removed" });
      } catch (err) {
        res.status(500).json({ message: "Server error" });
      }
});

module.exports = router;