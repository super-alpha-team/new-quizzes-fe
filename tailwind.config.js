
function randomHexColor() {
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
        random5: randomHexColor(),
        random6: randomHexColor(),
        random7: randomHexColor(),
        random8: randomHexColor(),
        random9: randomHexColor(),
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}