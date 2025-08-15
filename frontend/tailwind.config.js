/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["src/*.js", "src/component/*.js", "src/component/**/*.js"],
  theme: {
    extend: {
      backgroundImage: {
        "dark": "url(../img/bgDark.svg)",
        "light": "url(../img/bgLight.svg)",
      },
      colors: {
        primary: "#BBE1FA",
        back: "#0F4C75",
        "primary-light": "#1B262C",
        "back-light": "#3282B8"
      },
      fontFamily: {
        karla: "karla",
        fira: "fira"
      }
    }
  },
  plugins: [],
  darkMode: "class"
}
