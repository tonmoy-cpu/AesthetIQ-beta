import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Crown, Heart, Sparkles, Trophy, Brain, Share2, Download, Zap, Target, Award } from "lucide-react";
import Confetti from "react-confetti";
import GeminiAnalysis from "./GeminiAnalysis";

export default function ResultCard({ score, imageFile }) {
  const [showConfetti, setShowConfetti] = useState(false);
  const [animatedScore, setAnimatedScore] = useState(0);
  const [showGeminiAnalysis, setShowGeminiAnalysis] = useState(false);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
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

    const confettiTimer = setTimeout(() => setShowConfetti(false), 4000);
    
    return () => {
      clearInterval(timer);
      clearTimeout(confettiTimer);
    };
  }, [score]);

  const handleGeminiAnalysis = () => {
    console.log("🔍 Opening Gemini Analysis...");
    setShowGeminiAnalysis(true);
  };

  const handleCloseGeminiAnalysis = () => {
    console.log("❌ Closing Gemini Analysis");
    setShowGeminiAnalysis(false);
  };

  const getReaction = () => {
    if (score >= 4.5) return {
      text: "👑 ABSOLUTE ROYALTY! You're stunning! 🔥",
      color: "text-yellow-400",
      bgGradient: "from-yellow-400 via-orange-500 to-red-500",
      icon: Crown,
      stars: 5,
      level: "LEGENDARY",
      particles: "👑✨🔥💎⭐",
      description: "You've achieved the highest tier of beauty! Absolutely magnificent!"
    };
    if (score >= 4.0) return {
      text: "🌟 GORGEOUS! You're absolutely beautiful! ✨",
      color: "text-pink-400",
      bgGradient: "from-pink-400 via-purple-500 to-indigo-500",
      icon: Sparkles,
      stars: 5,
      level: "MASTER",
      particles: "🌟💖✨🦋🌸",
      description: "Outstanding beauty that captivates and inspires!"
    };
    if (score >= 3.5) return {
      text: "😍 STUNNING! Looking absolutely amazing! 💖",
      color: "text-purple-400",
      bgGradient: "from-purple-400 via-pink-500 to-rose-400",
      icon: Heart,
      stars: 4,
      level: "EXPERT",
      particles: "💖😍✨🌺💫",
      description: "Remarkable beauty with incredible charm and appeal!"
    };
    if (score >= 3.0) return {
      text: "🌸 BEAUTIFUL! You have a lovely charm! 🌺",
      color: "text-rose-400",
      bgGradient: "from-rose-400 via-pink-400 to-purple-400",
      icon: Star,
      stars: 4,
      level: "STAR",
      particles: "🌸🌺✨💕🦋",
      description: "Beautiful with natural grace and wonderful appeal!"
    };
    if (score >= 2.5) return {
      text: "😊 PRETTY! You have a sweet appeal! 🌷",
      color: "text-indigo-400",
      bgGradient: "from-indigo-400 via-purple-400 to-pink-400",
      icon: Heart,
      stars: 3,
      level: "RISING",
      particles: "😊🌷✨💕🌟",
      description: "Sweet and charming with delightful natural beauty!"
    };
    if (score >= 2.0) return {
      text: "🙂 NICE! You have your unique beauty! 🌻",
      color: "text-blue-400",
      bgGradient: "from-blue-400 via-indigo-400 to-purple-400",
      icon: Star,
      stars: 3,
      level: "UNIQUE",
      particles: "🙂🌻✨🌈💫",
      description: "Unique beauty that stands out in its own special way!"
    };
    return {
      text: "😄 SPECIAL! Beauty comes in all forms! 🌈",
      color: "text-green-400",
      bgGradient: "from-green-400 via-blue-400 to-purple-400",
      icon: Trophy,
      stars: 2,
      level: "EXPLORER",
      particles: "😄🌈✨🌟💫",
      description: "Every person has their own special kind of beauty!"
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
      navigator.clipboard.writeText(`I just got a ${score.toFixed(1)}/5.0 beauty score on AesthetIQ! 🌟 Check it out at ${window.location.href}`);
      alert('Score copied to clipboard! 📋');
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 50 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <>
      {showConfetti && (
        <Confetti
          width={windowSize.width}
          height={windowSize.height}
          recycle={false}
          numberOfPieces={300}
          gravity={0.3}
          colors={['#00f5ff', '#ff00ff', '#ffff00', '#ff0080', '#8000ff']}
        />
      )}
      
      <motion.div 
        className="glass-card rounded-3xl shadow-2xl p-8 text-center w-full max-w-md relative overflow-hidden"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        whileHover={{ scale: 1.01 }}
      >
        {/* Animated background */}
        <div className={`absolute inset-0 bg-gradient-to-br ${reaction.bgGradient} opacity-5 gradient-shift`}></div>
        
        <div className="relative z-10">
          {/* Level Badge */}
          <motion.div 
            className={`inline-block bg-gradient-to-r ${reaction.bgGradient} text-white text-sm font-bold px-6 py-3 rounded-full mb-8 neon-glow font-poppins`}
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
          >
            LEVEL: {reaction.level}
          </motion.div>

          {/* Animated Icon */}
          <motion.div 
            className={`bg-gradient-to-r ${reaction.bgGradient} w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg`}
            variants={itemVariants}
            animate={{
              rotate: [0, 5, -5, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <IconComponent className="w-12 h-12 text-white" />
          </motion.div>

          {/* Score Display */}
          <motion.div className="mb-8" variants={itemVariants}>
            <h2 className="text-2xl font-bold text-white mb-4 font-poppins">Your Beauty Score</h2>
            <div className={`text-6xl font-black ${reaction.color} mb-4 gradient-text-neon font-poppins`}>
              {animatedScore.toFixed(1)}
              <span className="text-3xl text-gray-400">/5.0</span>
            </div>
            
            {/* Star Rating */}
            <motion.div 
              className="flex justify-center space-x-2 mb-6"
              variants={itemVariants}
            >
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                >
                  <Star
                    className={`w-7 h-7 ${
                      i < reaction.stars
                        ? "text-yellow-400 fill-current neon-glow"
                        : "text-gray-600"
                    }`}
                  />
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Reaction Text */}
          <motion.div 
            className="glass-card-pink rounded-2xl p-6 mb-8"
            variants={itemVariants}
          >
            <p className="text-lg font-bold text-white mb-3 font-poppins">{reaction.text}</p>
            <p className="text-gray-300 text-sm font-inter leading-relaxed">{reaction.description}</p>
          </motion.div>

          {/* Stats Grid */}
          <motion.div 
            className="grid grid-cols-2 gap-4 mb-8"
            variants={itemVariants}
          >
            <div className="glass-card rounded-xl p-4 text-center">
              <div className="flex items-center justify-center mb-3">
                <Target className="w-6 h-6 text-cyan-400 mr-2" />
                <p className="font-bold text-cyan-400 font-poppins text-sm">Confidence</p>
              </div>
              <p className="text-white text-xl font-bold font-poppins">{Math.round(score * 20)}%</p>
            </div>
            <div className="glass-card rounded-xl p-4 text-center">
              <div className="flex items-center justify-center mb-3">
                <Zap className="w-6 h-6 text-pink-400 mr-2" />
                <p className="font-bold text-pink-400 font-poppins text-sm">Charm Level</p>
              </div>
              <p className="text-white text-xl font-bold font-poppins">{score >= 4 ? "MAX" : "HIGH"}</p>
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div className="space-y-6" variants={itemVariants}>
            {/* Gemini Analysis Button */}
            <motion.button
              onClick={handleGeminiAnalysis}
              disabled={!imageFile}
              className={`w-full font-bold py-4 px-6 rounded-2xl transition-all duration-300 flex items-center justify-center space-x-3 shadow-lg relative overflow-hidden font-poppins ${
                !imageFile 
                  ? "bg-gray-600 cursor-not-allowed opacity-50 text-white" 
                  : "btn-neon text-white"
              }`}
              whileHover={imageFile ? { scale: 1.02 } : {}}
              whileTap={imageFile ? { scale: 0.95 } : {}}
            >
              <Brain className="w-6 h-6" />
              <span>Analyze with Gemini AI</span>
              <Sparkles className="w-5 h-5 animate-pulse" />
            </motion.button>

            {/* Share Button */}
            <motion.button
              onClick={shareScore}
              className="w-full bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 flex items-center justify-center space-x-3 shadow-lg neon-pulse font-poppins"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.95 }}
            >
              <Share2 className="w-6 h-6" />
              <span>Share My Score</span>
            </motion.button>
          </motion.div>

          {/* Floating Particles */}
          <div className="absolute inset-0 pointer-events-none">
            {reaction.particles.split('').map((particle, index) => (
              <motion.div
                key={index}
                className="absolute text-2xl"
                initial={{ 
                  x: Math.random() * 300,
                  y: Math.random() * 400,
                  opacity: 0 
                }}
                animate={{
                  y: [null, -50, -100],
                  opacity: [0, 1, 0],
                  rotate: [0, 360]
                }}
                transition={{
                  duration: 3,
                  delay: index * 0.5,
                  repeat: Infinity,
                  repeatDelay: 2
                }}
              >
                {particle}
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Gemini Analysis Modal */}
      {showGeminiAnalysis && imageFile && (
        <GeminiAnalysis
          imageFile={imageFile}
          onClose={handleCloseGeminiAnalysis}
        />
      )}
    </>
  );
}