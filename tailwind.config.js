/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}', // Include all files in the pages directory
    './components/**/*.{js,ts,jsx,tsx}', // Include all files in the components directory
  ],
  theme: {
    extend: {
      screens: {
        '3xl': '1800px', // Custom breakpoint for screen widths above 1800px
      },
    },
  },
  plugins: [],
}