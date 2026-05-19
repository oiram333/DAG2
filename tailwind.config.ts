/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          DEFAULT: '#000000',
          lighter: '#0a0a0a',
          card: '#111111',
          border: '#1e1e1e',
          borderLight: '#333333',
        },
        silver: {
          DEFAULT: '#c0c0c0',
          light: '#d0d0d0',
          dark: '#a0a0a0',
        },
        surface: {
          DEFAULT: '#111111',
          hover: '#1a1a1a',
        },
        text: {
          primary: '#ffffff',
          secondary: '#aaaaaa',
          muted: '#888888',
          dim: '#777777',
          faint: '#666666',
          subtle: '#555555',
          ghost: '#444444',
          ultra: '#333333',
        },
      },
      fontFamily: {
        sans: ['Space Grotesk', 'sans-serif'],
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.8s ease-out forwards',
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'slide-in-right': 'slideInRight 0.8s ease-out forwards',
        'pulse-slow': 'pulseSlow 3s ease-in-out infinite',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(40px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        pulseSlow: {
          '0%, 100%': { opacity: '0.5' },
          '50%': { opacity: '0.8' },
        },
      },
    },
  },
  plugins: [],
}