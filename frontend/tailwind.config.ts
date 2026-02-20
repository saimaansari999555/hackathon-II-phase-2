import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#10b981', // Mist Emerald
          600: '#059669', // Deep Mist
          700: '#047857',
          800: '#065f46',
          900: '#064e3b',
          950: '#022c22',
        },
        surface: {
          dark: '#050a09', // Deepest Obsidian Green
          card: 'rgba(9, 22, 19, 0.7)', // Ghostly Forest Card
          accent: '#10b981', // Mist Glow
        },
      },
      backgroundImage: {
        'mist-gradient': 'linear-gradient(to bottom right, #050a09, #0a1f1a)',
        'glass-gradient': 'linear-gradient(rgba(16, 185, 129, 0.05), rgba(16, 185, 129, 0))',
      },
      boxShadow: {
        'mist': '0 0 20px rgba(16, 185, 129, 0.05)',
        'mist-glow': '0 0 35px rgba(16, 185, 129, 0.15)',
        'mist-premium': '0 0 50px rgba(16, 185, 129, 0.25)',
      },
      backdropBlur: {
        xs: '2px',
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        }
      }
    },
  },
  plugins: [],
};
export default config;
