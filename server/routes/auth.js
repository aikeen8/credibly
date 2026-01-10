const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const auth = require('../middleware/authMiddleware');

router.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;
    
    const existingUser = await User.findOne({ username });
    if (existingUser) return res.status(400).json({ message: "Username already taken" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ 
        username, 
        password: hashedPassword
    });
    
    await newUser.save();

    res.status(201).json({ message: "Account created successfully" });

  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.json({ token, username: user.username, role: user.role, avatar: user.avatar });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

router.get('/profile', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

router.put('/profile', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) return res.status(404).json({ message: "User not found" });

        if (req.body.avatar !== undefined) user.avatar = req.body.avatar;
        if (req.body.role !== undefined) user.role = req.body.role;
        
        await user.save();
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;