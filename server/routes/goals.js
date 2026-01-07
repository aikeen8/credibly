const express = require('express');
const router = express.Router();
const Goal = require('../models/Goal');

// GET all goals
router.get('/', async (req, res) => {
  try {
    const goals = await Goal.find().sort({ createdAt: -1 }); // Newest first
    res.json(goals);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST a new goal
router.post('/', async (req, res) => {
  const goal = new Goal({
    title: req.body.title,
    issuer: req.body.issuer,
    date: req.body.date,
    status: req.body.status,
    skills: req.body.skills, 
  });

  try {
    const newGoal = await goal.save();
    res.status(201).json(newGoal);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PATCH (Update) a goal status or details
router.patch('/:id', async (req, res) => {
  try {
    const updatedGoal = await Goal.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      { new: true } 
    );
    res.json(updatedGoal);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE a goal
router.delete('/:id', async (req, res) => {
  try {
    await Goal.findByIdAndDelete(req.params.id);
    res.json({ message: 'Goal deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;