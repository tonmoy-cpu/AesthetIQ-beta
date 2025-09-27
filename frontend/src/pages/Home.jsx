import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Camera, Sparkles, Trophy, Star, Users, Brain, Zap, 
  Upload, Image, Cpu, Wand2, Target, Award, Crown,
  ChevronDown, Play, Pause
} from "lucide-react";
import UploadBox from "../components/UploadBox";
import ResultCard from "../components/ResultCard";
import GameUI from "../components/GameUI";

export default function Home() {
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [particles, setParticles] = useState([]);

  // Create floating particles
  useEffect(() => {
    const createParticle = () => ({
      id: Math.random(),
      x: Math.random() * window.innerWidth,
      delay: Math.random() * 5,
    });

    const newParticles = Array.from({ length: 15 }, createParticle);
    setParticles(newParticles);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  const glowVariants = {
    initial: { scale: 1 },
    animate: {
      scale: [1, 1.05, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 relative overflow-hidden">
      {/* Cyber Grid Background */}
      <div className="absolute inset-0 cyber-grid opacity-20"></div>
      
      {/* Floating Particles */}
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="particle"
          style={{
            left: `${particle.x}px`,
            animationDelay: `${particle.delay}s`
          }}
        />
      ))}

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          className="absolute -top-4 -left-4 w-48 h-48 sm:w-72 sm:h-72 bg-cyan-400 opacity-10 rounded-full"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div 
          className="absolute top-1/2 -right-8 w-64 h-64 sm:w-96 sm:h-96 bg-pink-400 opacity-10 rounded-full"
          animate={{
            scale: [1, 0.8, 1],
            x: [-20, 20, -20],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute bottom-10 left-1/4 w-32 h-32 sm:w-48 sm:h-48 bg-purple-400 opacity-20 rounded-full"
          animate={{
            y: [-10, 10, -10],
            rotate: [0, -180, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      <motion.div 
        className="relative z-10 flex flex-col items-center justify-center min-h-screen p-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Hero Header */}
        <motion.div 
          className="text-center mb-8 sm:mb-12"
          variants={itemVariants}
        >
          <motion.div 
            className="flex items-center justify-center mb-6"
            variants={glowVariants}
            initial="initial"
            animate="animate"
          >
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
            >
              <Sparkles className="w-10 h-10 sm:w-16 sm:h-16 text-cyan-400 neon-glow mr-3" />
            </motion.div>
            <h1 className="text-5xl sm:text-6xl md:text-8xl font-black gradient-text-neon drop-shadow-2xl">
              AesthetIQ
            </h1>
            <motion.div
              whileHover={{ rotate: -360 }}
              transition={{ duration: 0.5 }}
            >
              <Sparkles className="w-10 h-10 sm:w-16 sm:h-16 text-pink-400 neon-pulse ml-3" />
            </motion.div>
          </motion.div>
          
          <motion.div
            variants={itemVariants}
            className="space-y-4"
          >
            <p className="text-xl sm:text-2xl md:text-3xl text-white font-semibold drop-shadow-lg">
              🎭 <span className="gradient-text-cyber">Discover Your Beauty Score with AI</span> 🌟
            </p>
            <p className="text-base sm:text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Upload your photo and unlock personalized insights powered by advanced artificial intelligence
            </p>
          </motion.div>
        </motion.div>

        {/* Feature Showcase */}
        <motion.div 
          className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-12 w-full max-w-5xl px-4"
          variants={itemVariants}
        >
          {[
            { icon: Camera, label: "Upload Photo", color: "text-cyan-400", delay: 0 },
            { icon: Cpu, label: "AI Analysis", color: "text-purple-400", delay: 0.1 },
            { icon: Target, label: "Get Score", color: "text-pink-400", delay: 0.2 },
            { icon: Wand2, label: "AI Tips", color: "text-yellow-400", delay: 0.3 }
          ].map((feature, index) => (
            <motion.div
              key={index}
              className="glass-card rounded-2xl p-4 sm:p-6 text-center group cursor-pointer"
              whileHover={{ 
                scale: 1.05,
                y: -5,
                transition: { duration: 0.2 }
              }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: feature.delay, duration: 0.5 }}
            >
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <feature.icon className={`w-8 h-8 sm:w-10 sm:h-10 ${feature.color} mx-auto mb-3 group-hover:neon-glow`} />
              </motion.div>
              <p className="text-white font-bold text-sm sm:text-base">{feature.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Upload Section */}
        <motion.div 
          className="w-full max-w-2xl px-4"
          variants={itemVariants}
        >
          <UploadBox setScore={setResult} isLoading={isLoading} setIsLoading={setIsLoading} />
        </motion.div>

        {/* Results Section */}
        <AnimatePresence mode="wait">
          {result !== null && (
            <motion.div 
              className="mt-8 sm:mt-12 space-y-6 sm:space-y-8 w-full max-w-2xl px-4"
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: -50 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <ResultCard score={result.score} imageFile={result.imageFile} />
              <GameUI score={result.score} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Stats & CTA Section */}
        {!result && (
          <motion.div 
            className="mt-12 sm:mt-16 space-y-8"
            variants={itemVariants}
          >
            {/* Stats Card */}
            <div className="glass-card-pink rounded-2xl sm:rounded-3xl p-6 sm:p-8 max-w-lg mx-4 text-center">
              <motion.div
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.3 }}
              >
                <Users className="w-12 h-12 sm:w-16 sm:h-16 text-pink-400 mx-auto mb-4 neon-pulse" />
              </motion.div>
              <h3 className="text-white font-bold text-xl sm:text-2xl mb-3 gradient-text-neon">
                Join Thousands of Users
              </h3>
              <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
                Discover your unique beauty score and get personalized enhancement tips from our advanced AI
              </p>
              
              {/* Progress indicators */}
              <div className="mt-6 grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-cyan-400">10K+</div>
                  <div className="text-xs text-gray-400">Photos Analyzed</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-pink-400">4.8★</div>
                  <div className="text-xs text-gray-400">Average Rating</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-purple-400">99%</div>
                  <div className="text-xs text-gray-400">Accuracy</div>
                </div>
              </div>
            </div>

            {/* How it Works */}
            <div className="glass-card rounded-2xl p-6 max-w-2xl mx-4">
              <h3 className="text-white font-bold text-xl mb-6 text-center gradient-text-cyber">
                How It Works
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {[
                  { step: "01", icon: Upload, title: "Upload", desc: "Choose your best photo" },
                  { step: "02", icon: Brain, title: "Analyze", desc: "AI processes your image" },
                  { step: "03", icon: Award, title: "Results", desc: "Get your beauty score" }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    className="text-center"
                    whileHover={{ y: -5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="text-cyan-400 font-bold text-sm mb-2">{item.step}</div>
                    <item.icon className="w-8 h-8 text-white mx-auto mb-2" />
                    <div className="text-white font-semibold text-sm mb-1">{item.title}</div>
                    <div className="text-gray-400 text-xs">{item.desc}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Footer */}
        <motion.div 
          className="mt-12 sm:mt-16 text-center px-4"
          variants={itemVariants}
        >
          <p className="text-gray-400 text-sm sm:text-base mb-2">
            ✨ <span className="gradient-text-neon font-semibold">Made with love for beauty enthusiasts worldwide</span> ✨
          </p>
          <p className="text-gray-500 text-xs">
            Powered by advanced AI technology & neural networks
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}