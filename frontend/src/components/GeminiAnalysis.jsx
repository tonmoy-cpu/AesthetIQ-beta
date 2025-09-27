import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { X, Loader, AlertCircle } from "lucide-react";
import axios from "axios";

export default function GeminiAnalysis({ imageFile, onClose }) {
  const [analysis, setAnalysis] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  console.log("🔧 GeminiAnalysis component rendered");
  console.log("📁 ImageFile in component:", !!imageFile);

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
        "https://aesthetiq-beta.onrender.com/api/gemini/analyze",
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

  // Simple inline styles to ensure visibility
  const overlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '16px',
    zIndex: 999999,
  };

  const modalStyle = {
    backgroundColor: 'white',
    borderRadius: '16px',
    width: '100%',
    maxWidth: '640px',
    maxHeight: '90vh',
    overflowY: 'auto',
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  };

  const headerStyle = {
    padding: '24px',
    borderBottom: '1px solid #e5e7eb',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  };

  const contentStyle = {
    padding: '24px',
  };

  return createPortal(
    <div style={overlayStyle}>
      <div style={modalStyle}>
        <div style={headerStyle}>
          <h2 style={{ margin: 0, fontSize: '24px', fontWeight: 'bold', color: '#111827' }}>
            Beauty Analysis
          </h2>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: '#6b7280',
              padding: '4px',
            }}
            disabled={isLoading}
          >
            <X size={24} />
          </button>
        </div>

        <div style={contentStyle}>
          {isLoading ? (
            <div style={{ textAlign: 'center', padding: '48px 0' }}>
              <Loader className="w-12 h-12 mx-auto mb-4 animate-spin text-purple-500" />
              <p style={{ color: '#4b5563', margin: 0 }}>Analyzing your photo...</p>
            </div>
          ) : error ? (
            <div style={{
              backgroundColor: '#fef2f2',
              padding: '16px',
              borderRadius: '8px',
              color: '#b91c1c'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <AlertCircle size={20} />
                <h3 style={{ margin: 0, fontWeight: '600' }}>Error</h3>
              </div>
              <p style={{ margin: '0 0 16px 0' }}>{error}</p>
              <button
                onClick={analyzeWithGemini}
                style={{
                  backgroundColor: '#9333ea',
                  color: 'white',
                  border: 'none',
                  padding: '8px 16px',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '14px',
                }}
              >
                Try Again
              </button>
            </div>
          ) : analysis ? (
            <div>
              <div style={{
                backgroundColor: '#f9fafb',
                padding: '16px',
                borderRadius: '8px',
                border: '1px solid #d1d5db'
              }}>
                <h3 style={{ 
                  margin: '0 0 12px 0', 
                  fontSize: '18px', 
                  fontWeight: '600', 
                  color: '#7c3aed' 
                }}>
                  Gemini AI Suggestions
                </h3>
                <div style={{
                  whiteSpace: 'pre-wrap',
                  color: '#374151',
                  lineHeight: '1.6',
                  fontSize: '15px'
                }}>
                  {analysis}
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>,
    document.body
  );
}