import express from "express";
import multer from "multer";
import fetch from "node-fetch";
import fs from "fs";
import FormData from "form-data";
import Score from "../models/Score.js";

const router = express.Router();

// Configure multer for file uploads
const upload = multer({
  dest: "uploads/",
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed!"), false);
    }
  }
});

router.post("/", upload.single("file"), async (req, res) => {
  let filePath;
  try {
    const { username } = req.body;

    if (!req.file) {
      return res.status(400).json({ error: "No image file provided" });
    }
    if (!username || username.trim().length === 0) {
      return res.status(400).json({ error: "Username is required" });
    }

    filePath = req.file.path;

    // Create form data for ML API (only send file, NOT username)
    const formData = new FormData();
    formData.append("file", fs.createReadStream(filePath));

    console.log("🔄 Sending image to ML API...");
    console.log("➡️ Headers being sent:", formData.getHeaders());

    // Send to HuggingFace ML API
    const response = await fetch(
      "https://heisnberg-1234-facial-beauty-predictor.hf.space/predict",
      {
        method: "POST",
        body: formData,
        headers: formData.getHeaders(),
      }
    );

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(
        `ML API responded with status ${response.status}: ${errText}`
      );
    }

    const result = await response.json();
    console.log("✅ ML API response:", result);

    // Ensure score is within valid range (1-5)
    let score = parseFloat(result.beauty_score);
    if (isNaN(score) || score < 1) score = 1;
    if (score > 5) score = 5;

    // Save score in DB
    const newScore = new Score({
      username: username.trim(),
      score: score,
    });
    await newScore.save();

    console.log(`💾 Saved score for ${username}: ${score}`);

    res.json({
      score: score,
      message: "Prediction successful!",
    });
  } catch (err) {
    console.error("❌ Prediction error:", err);

    res.status(500).json({
      error: "Prediction failed. Please try again!",
      details: err.message,
    });
  } finally {
    // Cleanup uploaded file
    if (filePath && fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  }
});

export default router;
