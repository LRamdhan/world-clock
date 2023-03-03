/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["src/*.js", "src/component/*.js"],
  theme: {
    extend: {
      backgroundImage: {
        gradient: "url(../img/gradient.svg)",
      },
      colors: {
        primary: "#BBE1FA",
        back: "#0F4C75"
      },
      fontFamily: {
        karla: "karla",
        fira: "fira"
      }
    },
  },
  plugins: [],
  darkMode: "class"
}
