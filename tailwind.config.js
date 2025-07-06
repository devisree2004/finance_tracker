const plugin = require('tailwindcss/plugin');

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: 'hsl(var(--primary))',
        secondary: 'hsl(var(--secondary))',
        border: 'hsl(var(--border))',
      },
      borderRadius: {
        lg: '0.5rem',
        md: '0.375rem',
        sm: '0.25rem',
      },
    },
  },
  plugins: [
    require('tailwindcss-animate'),
    plugin(function ({ addBase }) {
      addBase({
        ':root': {
          '--background': '0 0% 100%',
          '--foreground': '0 0% 3.9%',
          '--primary': '0 0% 9%',
          '--secondary': '0 0% 96.1%',
          '--border': '0 0% 89.8%',
        },
        '.dark': {
          '--background': '0 0% 3.9%',
          '--foreground': '0 0% 98%',
          '--primary': '0 0% 98%',
          '--secondary': '0 0% 14.9%',
          '--border': '0 0% 14.9%',
        },
      });
    }),
  ],
};
