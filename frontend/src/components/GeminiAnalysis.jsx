import React, { useState, useEffect } from "react";
import { Brain, Sparkles, Star, Heart, Camera, X } from "lucide-react";
import axios from "axios";

export default function GeminiAnalysis({ imageFile, onClose }) {
  const [analysis, setAnalysis] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const analyzeWithGemini = async () => {
    if (!imageFile) return;

    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("image", imageFile);

      const res = await axios.post(
        "http://localhost:5001/api/gemini/analyze",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      setAnalysis(res.data?.suggestions || "No insights found.");
    } catch (error) {
      console.error("Gemini analysis error:", error);
      setAnalysis(
        "Sorry, I couldn't analyze your photo right now. Please try again later! 😊"
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (imageFile) analyzeWithGemini();
  }, [imageFile]);

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-6 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-white/20 p-2 rounded-full">
                <Brain className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">AI Beauty Analysis</h2>
                <p className="text-white/90">Powered by Gemini AI</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="bg-white/20 hover:bg-white/30 p-2 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          {isLoading ? (
            <div className="text-center py-12">
              <div className="relative">
                <div className="w-20 h-20 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mx-auto mb-4 flex items-center justify-center animate-pulse">
                  <Brain className="w-10 h-10 text-white animate-bounce" />
                </div>
                <div className="absolute -top-2 -right-2">
                  <Sparkles className="w-6 h-6 text-yellow-400 animate-spin" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                Analyzing Your Beauty...
              </h3>
              <p className="text-gray-600">
                AI is examining your photo and preparing personalized
                suggestions ✨
              </p>
              <div className="mt-4 flex justify-center space-x-1">
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
                <div
                  className="w-2 h-2 bg-pink-400 rounded-full animate-bounce"
                  style={{ animationDelay: "0.1s" }}
                ></div>
                <div
                  className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"
                  style={{ animationDelay: "0.2s" }}
                ></div>
              </div>
            </div>
          ) : analysis ? (
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6">
                <div className="flex items-center space-x-2 mb-4">
                  <Star className="w-6 h-6 text-yellow-500" />
                  <h3 className="text-xl font-bold text-gray-800">
                    Your Personalized Beauty Analysis
                  </h3>
                </div>
                <div className="prose prose-purple max-w-none">
                  <div className="whitespace-pre-wrap text-gray-700 leading-relaxed">
                    {analysis || "No insights found."}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-blue-50 rounded-xl p-4 text-center">
                  <Heart className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                  <h4 className="font-bold text-blue-800">Personalized</h4>
                  <p className="text-blue-600 text-sm">Tailored just for you</p>
                </div>
                <div className="bg-purple-50 rounded-xl p-4 text-center">
                  <Brain className="w-8 h-8 text-purple-500 mx-auto mb-2" />
                  <h4 className="font-bold text-purple-800">AI-Powered</h4>
                  <p className="text-purple-600 text-sm">Advanced analysis</p>
                </div>
                <div className="bg-pink-50 rounded-xl p-4 text-center">
                  <Sparkles className="w-8 h-8 text-pink-500 mx-auto mb-2" />
                  <h4 className="font-bold text-pink-800">Actionable</h4>
                  <p className="text-pink-600 text-sm">Practical tips</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <Camera className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">
                No analysis available (yet). Try uploading a photo!
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-gray-50 p-4 text-center">
          <p className="text-gray-500 text-sm">
            💡 Remember: Beauty comes in all forms. These are just suggestions
            to enhance your natural charm!
          </p>
        </div>
      </div>
    </div>
  );
}
