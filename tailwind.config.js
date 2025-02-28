/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'primary': '#2563eb',
      },
      fontFamily: {
        signature: ['Great Vibes', 'cursive'],
      },
    },
  },
  plugins: [],
}; 