import React, { useEffect, useState } from "react";
import { Star, Crown, Heart, Sparkles, Trophy, Brain, Share2, Download } from "lucide-react";
import Confetti from "react-confetti";
import GeminiAnalysis from "./GeminiAnalysis";

export default function ResultCard({ score, imageFile }) {
  const [showConfetti, setShowConfetti] = useState(false);
  const [animatedScore, setAnimatedScore] = useState(0);
  const [showGeminiAnalysis, setShowGeminiAnalysis] = useState(false);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    // Set window size for confetti
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight
    });

    setShowConfetti(true);
    // Animate score counting up
    const timer = setInterval(() => {
      setAnimatedScore(prev => {
        if (prev < score) {
          return Math.min(prev + 0.1, score);
        }
        clearInterval(timer);
        return score;
      });
    }, 50);

    const confettiTimer = setTimeout(() => setShowConfetti(false), 3000);
    
    return () => {
      clearInterval(timer);
      clearTimeout(confettiTimer);
    };
  }, [score]);

  const getReaction = () => {
    if (score >= 4.5) return {
      text: "👑 ABSOLUTE ROYALTY! You're stunning! 🔥",
      color: "text-yellow-400",
      bgColor: "from-yellow-400 to-orange-500",
      icon: Crown,
      stars: 5,
      level: "LEGENDARY"
    };
    if (score >= 4.0) return {
      text: "🌟 GORGEOUS! You're absolutely beautiful! ✨",
      color: "text-pink-400",
      bgColor: "from-pink-400 to-purple-500",
      icon: Sparkles,
      stars: 5,
      level: "MASTER"
    };
    if (score >= 3.5) return {
      text: "😍 STUNNING! Looking absolutely amazing! 💖",
      color: "text-purple-400",
      bgColor: "from-purple-400 to-pink-500",
      icon: Heart,
      stars: 4,
      level: "EXPERT"
    };
    if (score >= 3.0) return {
      text: "🌸 BEAUTIFUL! You have a lovely charm! 🌺",
      color: "text-rose-400",
      bgColor: "from-rose-400 to-pink-400",
      icon: Star,
      stars: 4,
      level: "STAR"
    };
    if (score >= 2.5) return {
      text: "😊 PRETTY! You have a sweet appeal! 🌷",
      color: "text-indigo-400",
      bgColor: "from-indigo-400 to-purple-400",
      icon: Heart,
      stars: 3,
      level: "RISING"
    };
    if (score >= 2.0) return {
      text: "🙂 NICE! You have your unique beauty! 🌻",
      color: "text-blue-400",
      bgColor: "from-blue-400 to-indigo-400",
      icon: Star,
      stars: 3,
      level: "UNIQUE"
    };
    return {
      text: "😄 SPECIAL! Beauty comes in all forms! 🌈",
      color: "text-green-400",
      bgColor: "from-green-400 to-blue-400",
      icon: Trophy,
      stars: 2,
      level: "EXPLORER"
    };
  };

  const reaction = getReaction();
  const IconComponent = reaction.icon;

  const shareScore = () => {
    if (navigator.share) {
      navigator.share({
        title: 'My AesthetIQ Beauty Score',
        text: `I just got a ${score.toFixed(1)}/5.0 beauty score on AesthetIQ! 🌟`,
        url: window.location.href
      });
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(`I just got a ${score.toFixed(1)}/5.0 beauty score on AesthetIQ! 🌟 Check it out at ${window.location.href}`);
      alert('Score copied to clipboard! 📋');
    }
  };

  return (
    <>
      {showConfetti && (
        <Confetti
          width={windowSize.width}
          height={windowSize.height}
          recycle={false}
          numberOfPieces={200}
          gravity={0.3}
        />
      )}
      
      <div className="bg-white/95 backdrop-blur-sm rounded-2xl sm:rounded-3xl shadow-2xl p-4 sm:p-6 lg:p-8 text-center max-w-sm sm:max-w-md mx-auto transform hover:scale-105 transition-all duration-300">
        {/* Level Badge */}
        <div className={`inline-block bg-gradient-to-r ${reaction.bgColor} text-white text-xs sm:text-sm font-bold px-3 py-1 rounded-full mb-4`}>
          LEVEL: {reaction.level}
        </div>

        {/* Animated Icon */}
        <div className={`bg-gradient-to-r ${reaction.bgColor} w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce-slow shadow-lg`}>
          <IconComponent className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
        </div>

        {/* Score Display */}
        <div className="mb-4 sm:mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">Your Beauty Score</h2>
          <div className={`text-4xl sm:text-6xl font-extrabold ${reaction.color} mb-2`}>
            {animatedScore.toFixed(1)}
            <span className="text-lg sm:text-2xl text-gray-500">/5.0</span>
          </div>
          
          {/* Star Rating */}
          <div className="flex justify-center space-x-1 mb-4">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-5 h-5 sm:w-6 sm:h-6 ${
                  i < reaction.stars
                    ? "text-yellow-400 fill-current"
                    : "text-gray-300"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Reaction Text */}
        <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl sm:rounded-2xl p-3 sm:p-4 mb-4 sm:mb-6">
          <p className="text-base sm:text-lg font-semibold text-gray-800">{reaction.text}</p>
        </div>

        {/* Fun Stats */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4 text-sm mb-4 sm:mb-6">
          <div className="bg-blue-50 rounded-lg sm:rounded-xl p-3">
            <p className="font-bold text-blue-600 text-xs sm:text-sm">Confidence</p>
            <p className="text-blue-800 text-sm sm:text-base">{Math.round(score * 20)}%</p>
          </div>
          <div className="bg-pink-50 rounded-lg sm:rounded-xl p-3">
            <p className="font-bold text-pink-600 text-xs sm:text-sm">Charm Level</p>
            <p className="text-pink-800 text-sm sm:text-base">{score >= 4 ? "MAX" : "HIGH"}</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          {/* Gemini Analysis Button */}
          <button
            onClick={() => setShowGeminiAnalysis(true)}
            className="w-full bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white font-bold py-3 sm:py-4 px-4 sm:px-6 rounded-xl sm:rounded-2xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2 sm:space-x-3 shadow-lg text-sm sm:text-base"
          >
            <Brain className="w-5 h-5 sm:w-6 sm:h-6" />
            <span>Analyze with Gemini AI</span>
            <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 animate-pulse" />
          </button>

          {/* Share Button */}
          <button
            onClick={shareScore}
            className="w-full bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white font-bold py-2 sm:py-3 px-4 sm:px-6 rounded-lg sm:rounded-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2 shadow-lg text-sm"
          >
            <Share2 className="w-4 h-4 sm:w-5 sm:h-5" />
            <span>Share My Score</span>
          </button>
        </div>
      </div>

      {/* Gemini Analysis Modal */}
      {showGeminiAnalysis && (
        <GeminiAnalysis
          imageFile={imageFile}
          onClose={() => setShowGeminiAnalysis(false)}
        />
      )}
    </>
  );
}