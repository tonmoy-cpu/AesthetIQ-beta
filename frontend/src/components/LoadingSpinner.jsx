import React from "react";
import { motion } from "framer-motion";
import { Sparkles, Heart, Star, Brain, Zap, Crown } from "lucide-react";

export default function LoadingSpinner({ message = "Loading..." }) {
  const icons = [Sparkles, Heart, Star, Brain, Zap, Crown];
  
  return (
    <div className="flex flex-col items-center justify-center p-8">
      <div className="relative">
        {/* Main spinner ring */}
        <motion.div 
          className="w-16 h-16 border-4 border-transparent rounded-full"
          style={{
            background: "linear-gradient(45deg, #00f5ff, #ff00ff)",
            padding: "4px"
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        >
          <div className="w-full h-full bg-slate-900 rounded-full"></div>
        </motion.div>
        
        {/* Inner pulsing core */}
        <motion.div
          className="absolute inset-4 bg-gradient-to-r from-cyan-400 to-pink-400 rounded-full"
          animate={{
            scale: [0.8, 1.2, 0.8],
            opacity: [0.5, 1, 0.5]
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Floating icons */}
        {icons.map((Icon, index) => {
          const angle = (index * 60) * (Math.PI / 180);
          const radius = 40;
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius;
          
          return (
            <motion.div
              key={index}
              className="absolute"
              style={{
                left: `calc(50% + ${x}px)`,
                top: `calc(50% + ${y}px)`,
                transform: "translate(-50%, -50%)"
              }}
              animate={{
                rotate: [0, 360],
                scale: [0.8, 1.2, 0.8],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: index * 0.2,
                ease: "easeInOut"
              }}
            >
              <Icon className="w-4 h-4 text-cyan-400" />
            </motion.div>
          );
        })}
      </div>
      
      <motion.p 
        className="mt-6 text-white font-medium text-center px-4 gradient-text-neon"
        animate={{
          opacity: [0.7, 1, 0.7],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        {message}
      </motion.p>
      
      {/* Animated dots */}
      <div className="flex space-x-2 mt-4">
        {[0, 1, 2].map((index) => (
          <motion.div
            key={index}
            className="w-2 h-2 bg-gradient-to-r from-cyan-400 to-pink-400 rounded-full"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.5, 1, 0.5]
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              delay: index * 0.2,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>
    </div>
  );
}