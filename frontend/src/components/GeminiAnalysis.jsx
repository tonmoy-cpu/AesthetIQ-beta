import React, { useState, useEffect } from "react";
import { Brain, Sparkles, Star, Heart, Camera, X, Loader, CheckCircle, AlertCircle } from "lucide-react";
import axios from "axios";

export default function GeminiAnalysis({ imageFile, onClose }) {
  const [analysis, setAnalysis] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const analyzeWithGemini = async () => {
    if (!imageFile) {
      setError("No image file provided");
      return;
    }

    setIsLoading(true);
    setError(null);
    setAnalysis(null);
    
    try {
      const formData = new FormData();
      formData.append("image", imageFile);

      console.log("🤖 Sending to Gemini AI...");

      const res = await axios.post(
        "http://localhost:5001/api/gemini/analyze",
        formData,
        { 
          headers: { "Content-Type": "multipart/form-data" },
          timeout: 30000 // 30 second timeout
        }
      );

      console.log("✅ Gemini response received:", res.data);

      if (res.data && res.data.suggestions) {
        setAnalysis(res.data.suggestions);
        console.log("📝 Analysis set:", res.data.suggestions);
      } else {
        throw new Error("No suggestions received from AI");
      }
    } catch (error) {
      console.error("❌ Gemini analysis error:", error);
      setError(
        error.response?.data?.error || 
        error.message || 
        "Sorry, I couldn't analyze your photo right now. Please try again later! 😊"
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    console.log("🔄 GeminiAnalysis component mounted with imageFile:", !!imageFile);
    if (imageFile) {
      analyzeWithGemini();
    }
  }, [imageFile]);

  const formatAnalysis = (text) => {
    if (!text) return [];
    
    console.log("📄 Formatting analysis text:", text.substring(0, 100) + "...");
    
    // Split by numbered sections with asterisks
    const sections = text.split(/\*\*\d+\.\s*([^*]+):\*\*/);
    const formatted = [];
    
    for (let i = 1; i < sections.length; i += 2) {
      const title = sections[i];
      const content = sections[i + 1];
      
      if (title && content) {
        formatted.push({
          title: title.trim(),
          content: content.trim().replace(/\*\*/g, '').replace(/\*/g, '•')
        });
      }
    }
    
    // If no sections found, try alternative parsing
    if (formatted.length === 0) {
      const lines = text.split('\n').filter(line => line.trim());
      let currentSection = null;
      
      lines.forEach(line => {
        if (line.includes('**') && line.includes(':')) {
          // This is likely a section header
          const title = line.replace(/\*\*/g, '').replace(/\d+\.\s*/, '').replace(':', '').trim();
          currentSection = { title, content: '' };
          formatted.push(currentSection);
        } else if (currentSection && line.trim()) {
          // Add content to current section
          currentSection.content += line.replace(/\*/g, '•') + '\n';
        }
      });
    }
    
    // Final fallback - return as single section
    if (formatted.length === 0) {
      return [{ 
        title: "AI Beauty Analysis", 
        content: text.replace(/\*\*/g, '').replace(/\*/g, '•') 
      }];
    }
    
    console.log("📋 Formatted sections:", formatted.length);
    return formatted;
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 z-50 overflow-y-auto">
      <div className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl w-full max-w-4xl max-h-[95vh] overflow-hidden my-4">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-4 sm:p-6 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-white/20 p-2 rounded-full">
                <Brain className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold">AI Beauty Analysis</h2>
                <p className="text-white/90 text-sm sm:text-base">Powered by Gemini AI</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="bg-white/20 hover:bg-white/30 p-2 rounded-full transition-colors"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 overflow-y-auto max-h-[calc(95vh-140px)]">
          {isLoading ? (
            <div className="text-center py-8 sm:py-12">
              <div className="relative">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Brain className="w-8 h-8 sm:w-10 sm:h-10 text-white animate-pulse" />
                </div>
                <div className="absolute -top-2 -right-2">
                  <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-400 animate-spin" />
                </div>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2">
                Analyzing Your Beauty...
              </h3>
              <p className="text-gray-600 text-sm sm:text-base px-4">
                AI is examining your photo and preparing personalized suggestions ✨
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
          ) : error ? (
            <div className="text-center py-8 sm:py-12">
              <AlertCircle className="w-12 h-12 sm:w-16 sm:h-16 text-red-400 mx-auto mb-4" />
              <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2">
                Analysis Failed
              </h3>
              <p className="text-gray-600 text-sm sm:text-base mb-4 px-4">{error}</p>
              <button
                onClick={analyzeWithGemini}
                className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all text-sm sm:text-base"
              >
                Try Again
              </button>
            </div>
          ) : analysis ? (
            <div className="space-y-4 sm:space-y-6">
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl sm:rounded-2xl p-4 sm:p-6">
                <div className="flex items-center space-x-2 mb-4">
                  <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-green-500" />
                  <h3 className="text-lg sm:text-xl font-bold text-gray-800">
                    Your Personalized Beauty Analysis
                  </h3>
                </div>
                
                {/* Formatted Analysis */}
                <div className="space-y-4 sm:space-y-6">
                  {formatAnalysis(analysis).map((section, index) => (
                    <div key={index} className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-5 shadow-sm">
                      <h4 className="text-base sm:text-lg font-bold text-gray-800 mb-3 flex items-center">
                        <span className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white text-xs sm:text-sm font-bold mr-3">
                          {index + 1}
                        </span>
                        {section.title}
                      </h4>
                      <div className="text-gray-700 text-sm sm:text-base leading-relaxed whitespace-pre-wrap pl-9 sm:pl-11">
                        {section.content}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Feature Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                <div className="bg-blue-50 rounded-lg sm:rounded-xl p-3 sm:p-4 text-center">
                  <Heart className="w-6 h-6 sm:w-8 sm:h-8 text-blue-500 mx-auto mb-2" />
                  <h4 className="font-bold text-blue-800 text-sm sm:text-base">Personalized</h4>
                  <p className="text-blue-600 text-xs sm:text-sm">Tailored just for you</p>
                </div>
                <div className="bg-purple-50 rounded-lg sm:rounded-xl p-3 sm:p-4 text-center">
                  <Brain className="w-6 h-6 sm:w-8 sm:h-8 text-purple-500 mx-auto mb-2" />
                  <h4 className="font-bold text-purple-800 text-sm sm:text-base">AI-Powered</h4>
                  <p className="text-purple-600 text-xs sm:text-sm">Advanced analysis</p>
                </div>
                <div className="bg-pink-50 rounded-lg sm:rounded-xl p-3 sm:p-4 text-center">
                  <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 text-pink-500 mx-auto mb-2" />
                  <h4 className="font-bold text-pink-800 text-sm sm:text-base">Actionable</h4>
                  <p className="text-pink-600 text-xs sm:text-sm">Practical tips</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-8 sm:py-12">
              <Camera className="w-12 h-12 sm:w-16 sm:h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 text-sm sm:text-base">
                No analysis available. Please try again!
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-gray-50 p-3 sm:p-4 text-center border-t">
          <p className="text-gray-500 text-xs sm:text-sm">
            💡 Remember: Beauty comes in all forms. These are suggestions to enhance your natural charm!
          </p>
        </div>
      </div>
    </div>
  );
}