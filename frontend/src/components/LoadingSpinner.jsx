import React from "react";
import { Sparkles, Heart, Star, Brain } from "lucide-react";

export default function LoadingSpinner({ message = "Loading..." }) {
  return (
    <div className="flex flex-col items-center justify-center p-6 sm:p-8">
      <div className="relative">
        {/* Main spinner */}
        <div className="w-12 h-12 sm:w-16 sm:h-16 border-4 border-purple-200 border-t-purple-500 rounded-full animate-spin"></div>
        
        {/* Floating icons */}
        <div className="absolute -top-2 -right-2">
          <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-400 animate-bounce" />
        </div>
        <div className="absolute -bottom-2 -left-2">
          <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-pink-400 animate-pulse" />
        </div>
        <div className="absolute top-1/2 -left-6 transform -translate-y-1/2">
          <Star className="w-3 h-3 sm:w-4 sm:h-4 text-blue-400 animate-ping" />
        </div>
        <div className="absolute top-1/2 -right-6 transform -translate-y-1/2">
          <Brain className="w-3 h-3 sm:w-4 sm:h-4 text-purple-400 animate-pulse" />
        </div>
      </div>
      
      <p className="mt-4 text-gray-600 font-medium animate-pulse text-sm sm:text-base text-center px-4">{message}</p>
      
      {/* Animated dots */}
      <div className="flex space-x-1 mt-2">
        <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
        <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
        <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
      </div>
    </div>
  );
}