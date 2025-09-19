import React, { useState } from "react";
import { Camera, Sparkles, Trophy, Star, Users, Brain, Zap } from "lucide-react";
import UploadBox from "../components/UploadBox";
import ResultCard from "../components/ResultCard";
import GameUI from "../components/GameUI";

export default function Home() {
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-400 via-purple-500 to-indigo-600 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-4 -left-4 w-48 h-48 sm:w-72 sm:h-72 bg-white opacity-10 rounded-full animate-pulse-slow"></div>
        <div className="absolute top-1/2 -right-8 w-64 h-64 sm:w-96 sm:h-96 bg-yellow-300 opacity-10 rounded-full animate-bounce-slow"></div>
        <div className="absolute bottom-10 left-1/4 w-32 h-32 sm:w-48 sm:h-48 bg-pink-300 opacity-20 rounded-full animate-pulse"></div>
        <div className="absolute top-1/4 right-1/4 w-24 h-24 sm:w-36 sm:h-36 bg-purple-300 opacity-15 rounded-full animate-float"></div>
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-4">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <div className="flex items-center justify-center mb-4">
            <Sparkles className="w-8 h-8 sm:w-12 sm:h-12 text-yellow-300 animate-wiggle mr-2" />
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white drop-shadow-2xl">
              AesthetIQ
            </h1>
            <Sparkles className="w-8 h-8 sm:w-12 sm:h-12 text-yellow-300 animate-wiggle ml-2" />
          </div>
          <p className="text-lg sm:text-xl text-white/90 drop-shadow-lg font-medium px-4">
            🎭 Discover your beauty score with AI 🌟
          </p>
          <p className="text-sm sm:text-base text-white/80 mt-2 px-4">
            Upload your photo and get personalized beauty insights powered by advanced AI
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-6 mb-6 sm:mb-8 w-full max-w-4xl px-4">
          <div className="bg-white/20 backdrop-blur-sm rounded-xl sm:rounded-2xl p-3 sm:p-4 text-center">
            <Camera className="w-6 h-6 sm:w-8 sm:h-8 text-white mx-auto mb-2" />
            <p className="text-white font-bold text-xs sm:text-sm">Upload Photo</p>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-xl sm:rounded-2xl p-3 sm:p-4 text-center">
            <Zap className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-300 mx-auto mb-2" />
            <p className="text-white font-bold text-xs sm:text-sm">AI Analysis</p>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-xl sm:rounded-2xl p-3 sm:p-4 text-center">
            <Star className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-300 mx-auto mb-2" />
            <p className="text-white font-bold text-xs sm:text-sm">Get Score</p>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-xl sm:rounded-2xl p-3 sm:p-4 text-center">
            <Brain className="w-6 h-6 sm:w-8 sm:h-8 text-purple-300 mx-auto mb-2" />
            <p className="text-white font-bold text-xs sm:text-sm">AI Tips</p>
          </div>
        </div>

        {/* Upload Section */}
        <div className="w-full max-w-2xl px-4">
          <UploadBox setScore={setResult} isLoading={isLoading} setIsLoading={setIsLoading} />
        </div>

        {/* Results */}
        {result !== null && (
          <div className="mt-6 sm:mt-8 space-y-4 sm:space-y-6 w-full max-w-2xl px-4">
            <ResultCard score={result.score} imageFile={result.imageFile} />
            <GameUI score={result.score} />
          </div>
        )}

        {/* Stats Section */}
        {!result && (
          <div className="mt-8 sm:mt-12 bg-white/10 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 max-w-md mx-4">
            <div className="text-center">
              <Users className="w-8 h-8 sm:w-10 sm:h-10 text-white mx-auto mb-3" />
              <h3 className="text-white font-bold text-base sm:text-lg mb-2">Join Thousands of Users</h3>
              <p className="text-white/80 text-sm sm:text-base">
                Discover your unique beauty score and get personalized enhancement tips
              </p>
            </div>
          </div>
        )}

        {/* Fun Footer */}
        <div className="mt-8 sm:mt-12 text-center px-4">
          <p className="text-white/80 text-xs sm:text-sm">
            ✨ Made with love for beauty enthusiasts worldwide ✨
          </p>
          <p className="text-white/60 text-xs mt-1">
            Powered by advanced AI technology
          </p>
        </div>
      </div>
    </div>
  );
}