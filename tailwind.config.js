/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      colors: {
        background: '#050505',
        'background-light': '#151515',
        primary: {
          DEFAULT: '#00ffff',
          dark: '#00cccc',
          light: '#33ffff',
        },
        accent: {
          DEFAULT: '#ff00ff',
          dark: '#cc00cc',
          light: '#ff33ff',
        },
        success: {
          DEFAULT: '#39ff14',
          dark: '#2ecc11',
          light: '#60ff44',
        },
        terminal: {
          green: '#39ff14',
          blue: '#00ffff',
          purple: '#ff00ff',
          yellow: '#ffff00',
        },
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 8s ease-in-out infinite',
        'float-slower': 'float 10s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      rotate: {
        'y-180': '180deg',
      },
    },
  },
  plugins: [],
};