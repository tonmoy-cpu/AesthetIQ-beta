import express from "express";
import multer from "multer";
import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from "fs";
import dotenv from "dotenv";
dotenv.config();

const router = express.Router();

// Multer setup
const upload = multer({
  dest: "uploads/",
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed!"), false);
    }
  },
});

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

router.post("/analyze", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No image file provided" });
    }

    const filePath = req.file.path;
    const imageData = fs.readFileSync(filePath);
    const base64Image = imageData.toString("base64");

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `Analyze this photo and provide beauty enhancement suggestions. Focus on:
    1. Skincare recommendations
    2. Makeup tips
    3. Hairstyle suggestions
    4. Photography/lighting tips
    5. Overall styling advice
    
    Please be positive, constructive, and encouraging. Provide specific, actionable advice.`;

    const imagePart = {
      inlineData: {
        data: base64Image,
        mimeType: req.file.mimetype,
      },
    };

    console.log("🤖 Sending image to Gemini AI...");

    const result = await model.generateContent([
      { text: prompt },
      imagePart,
    ]);

    // ✅ Fix: extract directly from result
    const suggestions =
      result.response?.text() ||
      result.response?.candidates?.[0]?.content?.parts?.map(p => p.text).join("\n") ||
      "No insights found.";

    // Cleanup
    fs.unlinkSync(filePath);

    console.log("✅ Gemini AI analysis complete");
    console.log("📝 Gemini suggestions:", suggestions);

    res.json({
      suggestions,
      message: "Analysis complete!",
    });
  } catch (err) {
    console.error("❌ Gemini analysis error:", err);

    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }

    res.status(500).json({
      error: "Analysis failed. Please try again!",
      details: err.message,
    });
  }
});

export default router;
