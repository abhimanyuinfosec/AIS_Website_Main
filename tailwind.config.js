/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#eef4ff',
          100: '#d9e6ff',
          200: '#bcd4ff',
          300: '#8ebaff',
          400: '#5895ff',
          500: '#2b66ff',
          600: '#1d48f5',
          700: '#1635e0',
          800: '#172cb5',
          900: '#192b8e',
          cyan: '#00f0ff',
        },
        deep: {
          950: '#030611',
          900: '#070b1e',
          850: '#0a102b',
          800: '#0f173b',
          700: '#16204d',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        'glow-blue': '0 0 35px -5px rgba(43, 102, 255, 0.55), 0 0 15px rgba(0, 240, 255, 0.3)',
        'glow-cyan': '0 0 35px -5px rgba(0, 240, 255, 0.45)',
        'glass-card': 'inset 0 1px 1px 0 rgba(255, 255, 255, 0.16), 0 20px 40px -15px rgba(0, 0, 0, 0.65)',
        'glass-card-hover': 'inset 0 1px 2px 0 rgba(255, 255, 255, 0.3), 0 25px 50px -10px rgba(43, 102, 255, 0.35)',
        'glass-nav': 'inset 0 1px 1px 0 rgba(255, 255, 255, 0.1), 0 10px 30px -10px rgba(0, 0, 0, 0.7)',
      }
    }
  },
  plugins: [],
}
