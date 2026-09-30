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
          50: '#fff1f2',
          100: '#ffe4e6',
          200: '#fecdd3',
          300: '#fda4af',
          400: '#FF7A00', // Bright Amber
          500: '#C1121F', // Crimson Red
          600: '#8B0D18', // Deep Crimson
          700: '#6d0811',
          800: '#52050b',
          900: '#380206',
          crimson: '#C1121F',
          deepCrimson: '#8B0D18',
          amber: '#FFB000',
          brightAmber: '#FF7A00',
          dark: '#080808',
          card: '#0D0D0D',
          elevated: '#111111',
        },
        deep: {
          950: '#080808',
          900: '#0B0B0B',
          850: '#111111',
          800: '#151515',
          700: '#1c1c1c',
        },
        // Override blue and cyan tokens so existing components transition to crimson & amber
        blue: {
          50: '#fff5eb',
          100: '#ffebd4',
          200: '#ffd6a8',
          300: '#FFB000', // Amber Fire
          400: '#FF7A00', // Bright Amber
          500: '#C1121F', // Crimson Red
          600: '#C1121F', // Primary Crimson CTA
          700: '#8B0D18', // Deep Crimson
          800: '#670a12',
          900: '#4a060c',
          950: '#2b0307',
        },
        cyan: {
          300: '#FFB000',
          400: '#FF7A00',
          500: '#C1121F',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        display: ['Eurostile', 'Eurostile Extended', 'Michroma', 'sans-serif'],
        heading: ['Eurostile', 'Eurostile Extended', 'Michroma', 'sans-serif'],
      },
      boxShadow: {
        'glow-crimson': '0 4px 20px rgba(193, 18, 31, 0.25)',
        'glow-amber': '0 4px 20px rgba(255, 122, 0, 0.25)',
        'glass-card': '0 4px 20px -2px rgba(0, 0, 0, 0.6)',
        'glass-card-hover': '0 10px 25px -5px rgba(193, 18, 31, 0.15)',
        'glass-nav': '0 4px 20px -2px rgba(0, 0, 0, 0.8)',
      }
    }
  },
  plugins: [],
}
