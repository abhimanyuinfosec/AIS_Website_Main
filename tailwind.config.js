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
        display: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        heading: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        'glow-blue': '0 4px 12px rgba(0, 0, 0, 0.3)',
        'glow-cyan': '0 4px 12px rgba(0, 0, 0, 0.3)',
        'glass-card': '0 4px 20px -2px rgba(0, 0, 0, 0.5)',
        'glass-card-hover': '0 10px 25px -5px rgba(0, 0, 0, 0.6)',
        'glass-nav': '0 4px 20px -2px rgba(0, 0, 0, 0.7)',
      }
    }
  },
  plugins: [],
}
