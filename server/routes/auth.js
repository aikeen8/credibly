const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const User = require('../models/User');
const auth = require('../middleware/authMiddleware');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationToken = crypto.randomBytes(32).toString('hex');

    const newUser = new User({ 
        username, 
        email, 
        password: hashedPassword,
        verificationToken
    });
    
    await newUser.save();

    const link = `${process.env.CLIENT_URL}/verify-email?token=${verificationToken}`;

    await transporter.sendMail({
      from: '"Credibly Security" <no-reply@credibly.com>',
      to: email,
      subject: 'Verify your Credibly Account',
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #000;">
          <h2 style="text-transform: uppercase;">Welcome to Credibly!</h2>
          <p>Please verify your email to log in.</p>
          
          <br/>
          <a href="${link}" style="background-color: #bef264; color: black; padding: 10px 20px; text-decoration: none; font-weight: bold; border: 2px solid black; display: inline-block;">
            VERIFY MY ACCOUNT
          </a>
          <br/><br/>
          
          <p>If the button doesn't work, copy and paste this link into your browser:</p>
          <p style="background: #eee; padding: 10px;">${link}</p>
        </div>
      `
    });

    res.json({ message: "Verification email sent!" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error sending email" });
  }
});

router.post('/verify-email', async (req, res) => {
    try {
        const { token } = req.body;
        const user = await User.findOne({ verificationToken: token });

        if (!user) return res.status(400).json({ message: "Invalid or expired token" });

        user.isVerified = true;
        user.verificationToken = undefined;
        await user.save();

        const jwtToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

        res.json({ token: jwtToken, username: user.username });

    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});

router.post('/login', async (req, res) => {
  try {
    const { identifier, password } = req.body;

    const user = await User.findOne({ 
        $or: [{ username: identifier }, { email: identifier }] 
    });

    if (!user) return res.status(400).json({ message: "User not found" });

    if (!user.isVerified) {
        return res.status(403).json({ message: "Please check your email and verify your account first." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.json({ token, username: user.username });
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
        if (req.body.notifications !== undefined) user.notifications = req.body.notifications;
        
        await user.save();
        res.json(user);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;