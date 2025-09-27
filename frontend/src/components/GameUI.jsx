import React from "react";
import { motion } from "framer-motion";
import { Trophy, Medal, Award, Star, Crown, Zap, Target, TrendingUp } from "lucide-react";

export default function GameUI({ score }) {
  const getAchievement = () => {
    if (score >= 4.5) return {
      title: "👑 BEAUTY LEGEND",
      subtitle: "You've reached the highest tier!",
      color: "text-yellow-400",
      bgGradient: "from-yellow-400 via-orange-500 to-red-500",
      icon: Crown,
      level: "LEGENDARY",
      nextLevel: null,
      progress: 100
    };
    if (score >= 4.0) return {
      title: "🌟 BEAUTY MASTER",
      subtitle: "Outstanding beauty score!",
      color: "text-purple-400",
      bgGradient: "from-purple-400 via-pink-500 to-indigo-500",
      icon: Trophy,
      level: "MASTER",
      nextLevel: "LEGENDARY",
      progress: ((score - 4.0) / 0.5) * 100
    };
    if (score >= 3.5) return {
      title: "💎 BEAUTY EXPERT",
      subtitle: "Impressive beauty rating!",
      color: "text-pink-400",
      bgGradient: "from-pink-400 via-purple-400 to-blue-400",
      icon: Medal,
      level: "EXPERT",
      nextLevel: "MASTER",
      progress: ((score - 3.5) / 0.5) * 100
    };
    if (score >= 3.0) return {
      title: "⭐ BEAUTY STAR",
      subtitle: "Great beauty potential!",
      color: "text-blue-400",
      bgGradient: "from-blue-400 via-indigo-400 to-purple-400",
      icon: Star,
      level: "STAR",
      nextLevel: "EXPERT",
      progress: ((score - 3.0) / 0.5) * 100
    };
    return {
      title: "🌈 BEAUTY EXPLORER",
      subtitle: "Every journey starts somewhere!",
      color: "text-green-400",
      bgGradient: "from-green-400 via-blue-400 to-purple-400",
      icon: Award,
      level: "EXPLORER",
      nextLevel: "STAR",
      progress: ((score - 2.0) / 1.0) * 100
    };
  };

  const achievement = getAchievement();
  const IconComponent = achievement.icon;

  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      className="space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Achievement Badge */}
      <motion.div 
        className="glass-card rounded-3xl p-6 text-center shadow-xl relative overflow-hidden"
        variants={itemVariants}
        whileHover={{ scale: 1.02 }}
      >
        {/* Background gradient */}
        <div className={`absolute inset-0 bg-gradient-to-br ${achievement.bgGradient} opacity-10 gradient-shift`}></div>
        
        <div className="relative z-10">
          <motion.div 
            className={`bg-gradient-to-r ${achievement.bgGradient} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg`}
            animate={{
              rotate: [0, 10, -10, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <IconComponent className="w-8 h-8 text-white" />
          </motion.div>
          
          <h3 className={`text-xl font-bold ${achievement.color} mb-2 gradient-text-neon`}>
            {achievement.title}
          </h3>
          <p className="text-gray-300 text-sm mb-4">{achievement.subtitle}</p>
          
          <div className="glass-card-pink rounded-full px-4 py-2 inline-block">
            <span className="text-xs font-bold text-white">LEVEL: {achievement.level}</span>
          </div>
        </div>
      </motion.div>

      {/* Progress Section */}
      <motion.div 
        className="glass-card rounded-2xl p-6 shadow-xl"
        variants={itemVariants}
      >
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-2">
            <TrendingUp className="w-5 h-5 text-cyan-400" />
            <span className="text-white font-semibold">Beauty Journey</span>
          </div>
          <span className="text-cyan-400 font-bold">{Math.round(achievement.progress)}%</span>
        </div>
        
        <div className="w-full bg-white/10 rounded-full h-4 mb-3 overflow-hidden">
          <motion.div
            className={`h-full bg-gradient-to-r ${achievement.bgGradient} rounded-full relative`}
            initial={{ width: 0 }}
            animate={{ width: `${achievement.progress}%` }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          >
            <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
          </motion.div>
        </div>
        
        {achievement.nextLevel && (
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Current: {achievement.level}</span>
            <span className="text-gray-300">Next: {achievement.nextLevel}</span>
          </div>
        )}
      </motion.div>

      {/* Stats Cards */}
      <motion.div 
        className="grid grid-cols-2 gap-4"
        variants={itemVariants}
      >
        <motion.div 
          className="glass-card rounded-xl p-4 text-center"
          whileHover={{ scale: 1.05 }}
        >
          <Target className="w-6 h-6 text-cyan-400 mx-auto mb-2" />
          <p className="text-white font-semibold text-sm mb-1">Accuracy</p>
          <p className="text-cyan-400 font-bold text-lg">98.5%</p>
        </motion.div>
        
        <motion.div 
          className="glass-card rounded-xl p-4 text-center"
          whileHover={{ scale: 1.05 }}
        >
          <Zap className="w-6 h-6 text-pink-400 mx-auto mb-2" />
          <p className="text-white font-semibold text-sm mb-1">AI Power</p>
          <p className="text-pink-400 font-bold text-lg">MAX</p>
        </motion.div>
      </motion.div>

      {/* Motivational Message */}
      <motion.div 
        className="text-center"
        variants={itemVariants}
      >
        <motion.p 
          className="text-white/90 text-lg font-medium drop-shadow-lg gradient-text-cyber"
          animate={{
            opacity: [0.8, 1, 0.8],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          {score >= 4 ? "🎉 Share your amazing score with friends! 🎉" : "💪 Keep glowing and level up! ✨"}
        </motion.p>
      </motion.div>
    </motion.div>
  );
}