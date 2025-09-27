/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'poppins': ['Poppins', 'system-ui', 'sans-serif'],
        'inter': ['Inter', 'system-ui', 'sans-serif'],
        'sans': ['Inter', 'Poppins', 'system-ui', 'sans-serif'],
      },
      colors: {
        'neon-cyan': '#00f5ff',
        'neon-pink': '#ff00ff',
        'neon-purple': '#8a2be2',
        'cyber-dark': '#0a0a0f',
        'cyber-gray': '#1a1a2e',
      },
      animation: {
        'bounce-slow': 'bounce 3s infinite',
        'pulse-slow': 'pulse 4s infinite',
        'wiggle': 'wiggle 1s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite',
        'gradient-shift': 'gradient-shift 3s ease infinite',
        'neon-pulse': 'neon-pulse 1.5s ease-in-out infinite',
        'cyber-glitch': 'cyber-glitch 0.3s ease-in-out',
        'hologram': 'hologram 2s ease-in-out infinite',
      },
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%, 100%': { 
            boxShadow: '0 0 5px rgba(0, 245, 255, 0.3), 0 0 10px rgba(0, 245, 255, 0.2)' 
          },
          '50%': { 
            boxShadow: '0 0 20px rgba(0, 245, 255, 0.6), 0 0 30px rgba(0, 245, 255, 0.4)' 
          },
        },
        'gradient-shift': {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        'neon-pulse': {
          '0%, 100%': { 
            boxShadow: '0 0 5px rgba(255, 0, 255, 0.3), 0 0 10px rgba(255, 0, 255, 0.2)' 
          },
          '50%': { 
            boxShadow: '0 0 15px rgba(255, 0, 255, 0.6), 0 0 25px rgba(255, 0, 255, 0.4)' 
          },
        },
        'cyber-glitch': {
          '0%, 100%': { transform: 'translateX(0)' },
          '20%': { transform: 'translateX(-2px)' },
          '40%': { transform: 'translateX(2px)' },
          '60%': { transform: 'translateX(-1px)' },
          '80%': { transform: 'translateX(1px)' },
        },
        hologram: {
          '0%, 100%': { opacity: '1', transform: 'translateZ(0)' },
          '50%': { opacity: '0.8', transform: 'translateZ(10px)' },
        },
      },
      backdropBlur: {
        'xs': '2px',
      },
      boxShadow: {
        'neon': '0 0 5px rgba(0, 245, 255, 0.3), 0 0 10px rgba(0, 245, 255, 0.2), 0 0 15px rgba(0, 245, 255, 0.1)',
        'neon-pink': '0 0 5px rgba(255, 0, 255, 0.3), 0 0 10px rgba(255, 0, 255, 0.2), 0 0 15px rgba(255, 0, 255, 0.1)',
        'cyber': '0 8px 32px rgba(0, 0, 0, 0.3)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'cyber-grid': 'linear-gradient(rgba(0, 245, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 245, 255, 0.1) 1px, transparent 1px)',
      },
      backgroundSize: {
        'grid': '50px 50px',
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '1.5rem',
          lg: '2rem',
          xl: '2.5rem',
          '2xl': '3rem',
        },
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
    },
  },
  plugins: [],
}