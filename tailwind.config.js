/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/components/layout/BaseLayout.jsx",
    "./src/components/layout/Header.jsx",
    "./src/components/AboutHomeMade.jsx",
    "./src/components/Recipe.jsx",
    "./src/App.jsx"
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ["Merriweather", "serif"],
        cursive: ["Tilt Prism", "cursive"]
      },
    },
  },
  plugins: [],
}

