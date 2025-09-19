import React, { useState } from "react";
import { Camera, Loader, Sparkles, Upload, Image } from "lucide-react";
import axios from "axios";

export default function UploadBox({ setScore, isLoading, setIsLoading }) {
  const [file, setFile] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [username, setUsername] = useState("");
  const [dragActive, setDragActive] = useState(false);
  const [preview, setPreview] = useState(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelect = (selectedFile) => {
    setFile(selectedFile);
    setUploadedFile(selectedFile);
    const reader = new FileReader();
    reader.onload = (e) => setPreview(e.target.result);
    reader.readAsDataURL(selectedFile);
  };

  const handleUpload = async () => {
    if (!file || !username.trim()) {
      alert("Please enter your name and upload an image! 📸");
      return;
    }

    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("username", username.trim());

      const res = await axios.post("http://localhost:5001/api/predict", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setScore({ score: res.data.score, imageFile: uploadedFile });
    } catch (error) {
      console.error("Upload error:", error);
      alert("Oops! Something went wrong. Please try again! 😅");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white/20 backdrop-blur-lg rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 w-full max-w-lg mx-auto border border-white/30 shadow-2xl">
      <div className="space-y-4 sm:space-y-6">
        {/* Username Input */}
        <div>
          <label className="block text-white font-semibold mb-2 text-base sm:text-lg">
            ✨ What's your name?
          </label>
          <input
            type="text"
            placeholder="Enter your awesome name"
            className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg sm:rounded-xl border-2 border-white/30 bg-white/10 text-white placeholder-white/60 focus:outline-none focus:border-yellow-300 focus:ring-2 focus:ring-yellow-300/50 transition-all text-sm sm:text-base"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            disabled={isLoading}
          />
        </div>

        {/* File Upload Area */}
        <div>
          <label className="block text-white font-semibold mb-2 text-base sm:text-lg">
            📸 Upload your photo
          </label>
          <div
            className={`relative border-2 border-dashed rounded-xl sm:rounded-2xl p-6 sm:p-8 lg:p-10 text-center transition-all cursor-pointer min-h-[200px] sm:min-h-[240px] lg:min-h-[280px] flex flex-col items-center justify-center ${
              dragActive
                ? "border-yellow-300 bg-yellow-300/10 scale-105"
                : "border-white/40 hover:border-white/60 hover:bg-white/5"
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            onClick={() => document.getElementById("fileInput").click()}
          >
            <input
              id="fileInput"
              type="file"
              accept="image/*"
              onChange={(e) => e.target.files[0] && handleFileSelect(e.target.files[0])}
              className="hidden"
              disabled={isLoading}
            />

            {preview ? (
              <div className="space-y-4">
                <div className="relative">
                  <img
                    src={preview}
                    alt="Preview"
                    className="w-24 h-24 sm:w-32 sm:h-32 lg:w-40 lg:h-40 object-cover rounded-2xl mx-auto border-4 border-white/50 shadow-lg"
                  />
                  <div className="absolute -top-2 -right-2 bg-green-500 rounded-full p-1">
                    <Camera className="w-4 h-4 text-white" />
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-white/90 font-medium text-sm sm:text-base">Looking great! Ready to predict? 🌟</p>
                  <p className="text-white/70 text-xs sm:text-sm">{file?.name}</p>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="relative">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Upload className="w-8 h-8 sm:w-10 sm:h-10 text-white/60" />
                  </div>
                  <Image className="w-6 h-6 sm:w-8 sm:h-8 text-white/40 absolute -bottom-1 -right-1" />
                </div>
                <div className="space-y-2">
                  <p className="text-white font-medium text-base sm:text-lg">Drop your photo here</p>
                  <p className="text-white/60 text-sm sm:text-base">or click to browse</p>
                  <p className="text-white/50 text-xs sm:text-sm">Supports JPG, PNG, WEBP</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Upload Button */}
        <button
          onClick={handleUpload}
          disabled={isLoading || !file || !username.trim()}
          className={`w-full py-3 sm:py-4 px-4 sm:px-6 rounded-xl sm:rounded-2xl font-bold text-base sm:text-lg transition-all duration-300 transform ${
            isLoading || !file || !username.trim()
              ? "bg-gray-400 cursor-not-allowed opacity-50"
              : "bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 hover:scale-105 shadow-lg hover:shadow-xl active:scale-95"
          } text-white flex items-center justify-center space-x-2 sm:space-x-3`}
        >
          {isLoading ? (
            <>
              <Loader className="w-5 h-5 sm:w-6 sm:h-6 animate-spin" />
              <span>Analyzing your beauty... ✨</span>
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5 sm:w-6 sm:h-6" />
              <span>Predict My Beauty Score! 🎭</span>
            </>
          )}
        </button>

        {/* Tips */}
        <div className="bg-white/10 rounded-lg sm:rounded-xl p-3 sm:p-4">
          <p className="text-white/80 text-xs sm:text-sm text-center">
            💡 <strong>Pro Tips:</strong> Use good lighting, face the camera directly, and smile naturally for best results!
          </p>
        </div>
      </div>
    </div>
  );
}