import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, Loader, Sparkles, Upload, Zap, CircleCheck as CheckCircle, CircleAlert as AlertCircle } from "lucide-react";
import axios from "axios";

export default function UploadBox({ setScore, isLoading, setIsLoading }) {
  const [file, setFile] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [username, setUsername] = useState("");
  const [dragActive, setDragActive] = useState(false);
  const [preview, setPreview] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);

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
    setUploadProgress(0);

    // Simulate upload progress
    const progressInterval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 90) {
          clearInterval(progressInterval);
          return 90;
        }
        return prev + Math.random() * 15;
      });
    }, 200);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("username", username.trim());

      const res = await axios.post("http://localhost:5001/api/predict", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setUploadProgress(100);
      setTimeout(() => {
        setScore({ score: res.data.score, imageFile: uploadedFile });
      }, 500);
    } catch (error) {
      console.error("Upload error:", error);
      alert("Oops! Something went wrong. Please try again! 😅");
    } finally {
      clearInterval(progressInterval);
      setTimeout(() => {
        setIsLoading(false);
        setUploadProgress(0);
      }, 1000);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      className="glass-card rounded-3xl p-8 w-full border-2 border-cyan-400/20 shadow-2xl relative overflow-hidden"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      whileHover={{ 
        borderColor: "rgba(0, 245, 255, 0.4)",
        boxShadow: "0 0 30px rgba(0, 245, 255, 0.2)"
      }}
    >
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/3 via-purple-500/3 to-pink-500/3 gradient-shift"></div>
      
      <div className="relative z-10 space-y-8">
        {/* Username Input */}
        <motion.div variants={itemVariants}>
          <label className="block text-white font-semibold mb-4 text-lg font-poppins flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-cyan-400 mr-3" />
            What's your name?
          </label>
          <motion.input
            type="text"
            placeholder="Enter your awesome name"
            className="w-full px-6 py-4 rounded-xl bg-white/10 border-2 border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/50 transition-all backdrop-blur-sm font-inter text-center"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            disabled={isLoading}
            whileFocus={{ scale: 1.02 }}
          />
        </motion.div>

        {/* File Upload Area */}
        <motion.div variants={itemVariants}>
          <label className="block text-white font-semibold mb-4 text-lg font-poppins flex items-center justify-center">
            <Camera className="w-5 h-5 text-pink-400 mr-3" />
            Upload your photo
          </label>
          
          <motion.div
            className={`relative border-2 border-dashed rounded-2xl p-12 text-center transition-all cursor-pointer min-h-[320px] flex flex-col items-center justify-center ${
              dragActive
                ? "border-cyan-400 bg-cyan-400/10 scale-105"
                : "border-white/30 hover:border-white/50 hover:bg-white/5"
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            onClick={() => document.getElementById("fileInput").click()}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <input
              id="fileInput"
              type="file"
              accept="image/*"
              onChange={(e) => e.target.files[0] && handleFileSelect(e.target.files[0])}
              className="hidden"
              disabled={isLoading}
            />

            <AnimatePresence mode="wait">
              {preview ? (
                <motion.div 
                  className="space-y-6 flex flex-col items-center"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="relative">
                    <motion.img
                      src={preview}
                      alt="Preview"
                      className="w-40 h-40 lg:w-48 lg:h-48 object-cover rounded-2xl border-4 border-cyan-400/50 shadow-lg"
                      whileHover={{ scale: 1.05 }}
                    />
                    <motion.div 
                      className="absolute -top-2 -right-2 bg-gradient-to-r from-green-400 to-cyan-400 rounded-full p-2"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      <CheckCircle className="w-5 h-5 text-white" />
                    </motion.div>
                  </div>
                  <div className="space-y-3 text-center">
                    <p className="text-white font-semibold text-lg font-poppins">Looking great! Ready to predict? 🌟</p>
                    <p className="text-gray-300 text-sm font-inter truncate max-w-xs">{file?.name}</p>
                  </div>
                </motion.div>
              ) : (
                <motion.div 
                  className="space-y-8 flex flex-col items-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <motion.div 
                    className="relative"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="w-24 h-24 bg-gradient-to-br from-cyan-400/20 to-pink-400/20 rounded-full flex items-center justify-center neon-glow">
                      <Upload className="w-10 h-10 text-cyan-400" />
                    </div>
                  </motion.div>
                  <div className="space-y-4 text-center">
                    <p className="text-white font-semibold text-xl font-poppins">Drop your photo here</p>
                    <p className="text-gray-300 text-base font-inter">or click to browse</p>
                    <div className="flex items-center justify-center space-x-4 text-sm text-gray-400 font-inter">
                      <span>JPG</span>
                      <span>•</span>
                      <span>PNG</span>
                      <span>•</span>
                      <span>WEBP</span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>

        {/* Upload Progress */}
        <AnimatePresence>
          {isLoading && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="space-y-4"
            >
              <div className="flex items-center justify-between">
                <span className="text-gray-300 font-inter">Analyzing...</span>
                <span className="text-cyan-400 font-semibold font-poppins">{Math.round(uploadProgress)}%</span>
              </div>
              <div className="w-full bg-white/10 rounded-full h-3 overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-cyan-400 to-pink-400 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${uploadProgress}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Upload Button */}
        <motion.button
          onClick={handleUpload}
          disabled={isLoading || !file || !username.trim()}
          className={`w-full py-5 px-8 rounded-2xl font-bold text-lg transition-all duration-300 transform relative overflow-hidden ${
            isLoading || !file || !username.trim()
              ? "bg-gray-600 cursor-not-allowed opacity-50"
              : "btn-neon text-white hover:scale-[1.02] shadow-lg hover:shadow-cyan-400/25"
          } flex items-center justify-center space-x-4 font-poppins`}
          variants={itemVariants}
          whileHover={!isLoading && file && username.trim() ? { scale: 1.02 } : {}}
          whileTap={!isLoading && file && username.trim() ? { scale: 0.95 } : {}}
        >
          <AnimatePresence mode="wait">
            {isLoading ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center space-x-4"
              >
                <Loader className="w-6 h-6 animate-spin" />
                <span>Analyzing your beauty...</span>
                <Zap className="w-5 h-5 animate-pulse" />
              </motion.div>
            ) : (
              <motion.div
                key="ready"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center space-x-4"
              >
                <Sparkles className="w-6 h-6" />
                <span>Predict My Beauty Score!</span>
                <Camera className="w-5 h-5" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>

        {/* Pro Tips */}
        <motion.div 
          className="glass-card-pink rounded-xl p-6"
          variants={itemVariants}
        >
          <div className="flex items-start space-x-4">
            <Zap className="w-6 h-6 text-yellow-400 mt-1 flex-shrink-0" />
            <div className="space-y-2">
              <p className="text-white font-semibold text-base font-poppins">Pro Tips:</p>
              <p className="text-gray-300 text-sm leading-relaxed font-inter">
                Use good lighting, face the camera directly, and smile naturally for best results!
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}