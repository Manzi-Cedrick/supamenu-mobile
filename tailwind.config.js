const colors = require('tailwindcss/colors')
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}",
],
  theme: {
    extend: {
      backgroundImage: {
        'ad-pattern': "url('@/assets/images/resto-ad.png')",
      }
    },
    colors: {
      primary: '#F7941C',
      accent: '#f9f9f9',
      ...colors,
   },
  },
  plugins: [],
}

