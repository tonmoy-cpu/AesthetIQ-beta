import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { X, Loader, AlertCircle } from "lucide-react";
import axios from "axios";
import ReactMarkdown from "react-markdown";

export default function GeminiAnalysis({ imageFile, onClose }) {
  const [analysis, setAnalysis] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const analyzeWithGemini = async () => {
    console.log("🔍 Starting Gemini analysis...");
    setIsLoading(true);
    setError(null);
    setAnalysis("");

    try {
      if (!imageFile) throw new Error("No image file provided");

      const formData = new FormData();
      formData.append("image", imageFile);

      console.log("📤 Sending image to Gemini API...");
      const res = await axios.post(
        "http://localhost:5001/api/gemini/analyze",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          timeout: 60000,
        }
      );

      console.log("✅ Gemini response received:", res.data);

      if (res.data?.suggestions) {
        setAnalysis(res.data.suggestions);
      } else if (typeof res.data === "string") {
        setAnalysis(res.data);
      } else {
        setAnalysis(JSON.stringify(res.data, null, 2));
      }
    } catch (err) {
      console.error("❌ Error analyzing image:", err);
      setError(
        err.response?.data?.error || err.message || "Failed to analyze image"
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (imageFile) analyzeWithGemini();
  }, [imageFile]);

  return createPortal(
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-[9999]">
      <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Beauty Analysis</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
              disabled={isLoading}
            >
              <X size={24} />
            </button>
          </div>

          {isLoading ? (
            <div className="text-center py-12">
              <Loader className="w-12 h-12 mx-auto mb-4 animate-spin text-purple-500" />
              <p className="text-gray-600">Analyzing your photo...</p>
            </div>
          ) : error ? (
            <div className="bg-red-50 p-4 rounded-lg text-red-700">
              <div className="flex items-center gap-2 mb-2">
                <AlertCircle className="w-5 h-5" />
                <h3 className="font-semibold">Error</h3>
              </div>
              <p>{error}</p>
              <button
                onClick={analyzeWithGemini}
                className="mt-4 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                Try Again
              </button>
            </div>
          ) : analysis ? (
            <div className="space-y-4">
              {/* Simple direct rendering for debugging visibility */}
              {typeof analysis === 'string' ? (
                <div className="bg-gray-50 p-4 rounded-lg border border-purple-200">
                  <h3 className="font-semibold text-lg mb-2 text-purple-700">Gemini Suggestions</h3>
                  <pre className="whitespace-pre-wrap text-gray-800 text-base">
                    {analysis}
                  </pre>
                </div>
              ) : (
                <div className="space-y-4">
                  {formatAnalysis(analysis).map((section, index) => (
                    <div key={index} className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="font-semibold text-lg mb-2 text-purple-700">
                        {section.title}
                      </h3>
                      <div className="whitespace-pre-wrap text-gray-700">
                        {section.content}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : null}
        </div>
      </div>
    </div>,
    document.body
  );
}
