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

    // Use a model that your API key supports
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash"
    });

    const prompt = `Analyze this photo in a summary and provide beauty enhancement suggestions under 100 words. Focus on:
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

    console.log("🤖 Sending image to Gemini AI (gemini-2.5-flash)...");

    const result = await model.generateContent([
      { text: prompt },
      imagePart,
    ]);

    let suggestions = "No insights found.";
    if (typeof result?.response?.text === "function") {
      suggestions = result.response.text();
    } else if (result?.response?.candidates?.[0]?.content?.parts) {
      suggestions = result.response.candidates[0].content.parts
        .map(p => p.text || "")
        .join("\n");
    }

    // Clean up the uploaded file
    fs.unlinkSync(filePath);

    console.log("✅ Gemini AI analysis complete");
    console.log("📝 Gemini suggestions:", suggestions);

    res.json({
      suggestions,
      message: "Analysis complete!",
      success: true
    });
  } catch (err) {
    console.error("❌ Gemini analysis error:", err);

    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }

    res.status(500).json({
      error: "Analysis failed. Please try again!",
      details: err.message,
      success: false,
    });
  }
});

export default router;
