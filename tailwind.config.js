/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'monad-purple': '#8B5CF6',
        'monad-purple-dark': '#7C3AED',
        'monad-gold': '#F59E0B',
        'monad-gold-dark': '#D97706',
      },
      animation: {
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 5px #8B5CF6, 0 0 10px #8B5CF6, 0 0 15px #8B5CF6' },
          '100%': { boxShadow: '0 0 10px #8B5CF6, 0 0 20px #8B5CF6, 0 0 30px #8B5CF6' }
        }
      }
    },
  },
  plugins: [],
}
