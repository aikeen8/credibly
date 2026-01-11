const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const Goal = require('../models/Goal');
const User = require('../models/User');

router.get('/', auth, async (req, res) => {
  try {
    const leaderboard = await Goal.aggregate([
      { 
        $match: { 
          status: "Completed", 
          isAutomated: false // Exclude onboarding/automated goals
        } 
      },
      { 
        $group: { 
          _id: "$user", 
          completedCount: { $sum: 1 } 
        } 
      },
      { $sort: { completedCount: -1 } },
      { $limit: 20 }, // Top 20 users only
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "userDetails"
        }
      },
      { $unwind: "$userDetails" },
      {
        $project: {
          _id: 1,
          points: "$completedCount",
          username: "$userDetails.username",
          avatar: "$userDetails.avatar",
          role: "$userDetails.role"
        }
      }
    ]);

    res.json(leaderboard);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;