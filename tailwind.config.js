/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: "#121212",
        slateDark: "#1C1A17",
        concrete: "#CBCBCB",
        cream: "#FAF7F2",
        gold: "#C5A059",
      },
      fontFamily: {
        serif: ['Cormorant Garamond', 'serif'],
        sans: ['Plus Jakarta Sans', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
