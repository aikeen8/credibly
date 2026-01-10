const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const Goal = require('../models/Goal');

// EXPORT DATA (Download JSON)
router.get('/export', auth, async (req, res) => {
  try {
    const goals = await Goal.find({ user: req.user.id }).select('-_id -user -__v');
    
    const backupData = {
      exportedAt: new Date().toISOString(),
      recordCount: goals.length,
      data: goals
    };

    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Content-Disposition', 'attachment; filename=credibly_backup.json');
    res.json(backupData);
  } catch (err) {
    res.status(500).json({ message: "Export failed" });
  }
});

// IMPORT DATA (Upload JSON)
router.post('/import', auth, async (req, res) => {
  try {
    const { data } = req.body;

    if (!Array.isArray(data)) {
      return res.status(400).json({ message: "Invalid file format" });
    }

    // Prepare data: Attach current user ID to all imported items
    const goalsToInsert = data.map(goal => ({
      ...goal,
      user: req.user.id, // Force ownership to current user
      date: goal.date || new Date().toISOString().split('T')[0]
    }));

    // Optional: Delete old data before import (Clean Slate)
    // await Goal.deleteMany({ user: req.user.id });

    await Goal.insertMany(goalsToInsert);

    res.json({ message: `Successfully imported ${goalsToInsert.length} records!` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Import failed" });
  }
});

module.exports = router;