const express = require('express');
const router = express.Router();
const axios = require('axios');
const rateLimit = require("express-rate-limit");
const Goal = require('../models/Goal');

const aiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  message: { message: "Too many requests." },
  standardHeaders: true,
  legacyHeaders: false,
});

router.post('/recommend', aiLimiter, async (req, res) => {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) return res.status(500).json({ message: "Server configuration error." });

    const listResponse = await axios.get(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`);
    
    const validModel = listResponse.data.models.find(m => 
        m.supportedGenerationMethods.includes("generateContent") &&
        (m.name.includes("flash") || m.name.includes("pro"))
    );

    if (!validModel) throw new Error("No compatible AI model found.");

    const goals = await Goal.find();
    const skills = goals.length > 0 ? goals.flatMap(g => g.skills || []).join(', ') : "general IT skills";
    const titles = goals.length > 0 ? goals.map(g => g.title).join(', ') : "IT enthusiast";

    const prompt = `
      You are a strict JSON data generator. Do not speak.
      Based on a student interested in "${titles}" with skills in "${skills}", recommend ONE specific online course.

      CRITICAL INSTRUCTION:
      1. DIVERSIFY SOURCES: Do NOT just suggest one issuer. Prioritize Udemy, edX, Udacity, Pluralsight, freeCodeCamp, or other official documentation if it fits better.
      2. STABLE LINKS: Only provide URLs to main landing pages that do not expire.
      3. RELEVANCE: Ensure the course level matches their skills.

      Output strictly valid JSON:
      { 
        "title": "Course Name", 
        "url": "https://link-to-course", 
        "reason": "One short, encouraging sentence." 
      }
    `;

    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/${validModel.name}:generateContent?key=${apiKey}`,
      { contents: [{ parts: [{ text: prompt }] }] },
      { headers: { 'Content-Type': 'application/json' } }
    );

    let text = response.data.candidates[0].content.parts[0].text;
    text = text.replace(/```json/g, '').replace(/```/g, '').trim();
    
    const jsonStart = text.indexOf('{');
    const jsonEnd = text.lastIndexOf('}');
    if (jsonStart !== -1 && jsonEnd !== -1) {
        text = text.substring(jsonStart, jsonEnd + 1);
    }
    
    res.json(JSON.parse(text));

  } catch (error) {
    console.error("AI Error:", error.message);
    res.json({
        title: "Full Stack Open",
        url: "https://fullstackopen.com/en/",
        reason: "Since we couldn't reach the AI, try this excellent free resource for modern web development."
    });
  }
});

module.exports = router;