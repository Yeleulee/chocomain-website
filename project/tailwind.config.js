/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fff7ed',
          100: '#ffedd5',
          200: '#fed7aa',
          300: '#fdb571',
          400: '#fb923c',
          500: '#f97316',
          600: '#ea580c',
          700: '#c2410c',
          800: '#9a3412',
          900: '#7c2d12',
        },
        luxury: {
          gold: '#D4AF37',
          bronze: '#CD7F32',
          chocolate: '#7B3F00',
          cream: '#FFFDD0',
          dark: '#1A1110',
        },
      },
      fontFamily: {
        sans: ['Inter var', 'sans-serif'],
        display: ['Playfair Display', 'serif'],
        accent: ['Cormorant Garamond', 'serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'texture': 'url("https://www.transparenttextures.com/patterns/cream-paper.png")',
      },
      boxShadow: {
        'luxury': '0 0 15px -3px rgba(212, 175, 55, 0.4)',
      },
    },
  },
  plugins: [],
};