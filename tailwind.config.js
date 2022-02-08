
function randomHexColor () {
  // Generate a random 2 digit hex number, padded with a 0 if necessary
  const part = () =>
      Math.floor(Math.random() * 256)
          .toString(16)
          .padStart(2, '0');
  const r = part();
  const g = part();
  const b = part();
  return `#${r}${g}${b}`;
}

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        random0: randomHexColor(),
        random1: randomHexColor(),
        random2: randomHexColor(),
        random3: randomHexColor(),
        random4: randomHexColor(),
        blue: {
            dark: "#2E5185",
        }
      },
      boxShadow: {
          quiz: "0px 5px 30px 26px rgba(152, 152, 152, 0.15)",
          answer: "0px 0px 30px 3px rgba(196, 207, 235, 0.3)",
      }
    },
  },
  plugins: [require('@tailwindcss/typography')],
}