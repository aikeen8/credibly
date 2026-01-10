const express = require('express');
const router = express.Router();
const Goal = require('../models/Goal');
const auth = require('../middleware/authMiddleware');

router.get('/', auth, async (req, res) => {
  try {
    const goals = await Goal.find({ user: req.user.id });
    res.json(goals);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/', auth, async (req, res) => {
  const goal = new Goal({
    user: req.user.id,
    title: req.body.title,
    issuer: req.body.issuer || "Self-Paced",
    status: req.body.status,
    date: req.body.date,
    skills: req.body.skills,
    credentialUrl: req.body.credentialUrl,
    roadmap: req.body.roadmap
  });

  try {
    const newGoal = await goal.save();
    res.status(201).json(newGoal);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.put('/:id', auth, async (req, res) => {
    try {
        let goal = await Goal.findById(req.params.id);
        if (!goal) return res.status(404).json({ message: "Goal not found" });

        if (goal.user.toString() !== req.user.id) {
            return res.status(401).json({ message: "Not authorized" });
        }

        goal.title = req.body.title || goal.title;
        goal.issuer = req.body.issuer || goal.issuer;
        goal.status = req.body.status || goal.status;
        goal.date = req.body.date || goal.date;
        goal.skills = req.body.skills || goal.skills;
        goal.credentialUrl = req.body.credentialUrl || goal.credentialUrl;
        
        if (req.body.roadmap) {
            goal.roadmap = req.body.roadmap;
        }

        await goal.save();
        res.json(goal);
    } catch (err) {
        res.status(500).json({ message: "Server Error" });
    }
});

router.delete('/:id', auth, async (req, res) => {
    try {
        const goal = await Goal.findById(req.params.id);
        if (!goal) return res.status(404).json({ message: "Goal not found" });

        if (goal.user.toString() !== req.user.id) {
            return res.status(401).json({ message: "Not authorized" });
        }

        await goal.deleteOne();
        res.json({ message: "Goal deleted" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;