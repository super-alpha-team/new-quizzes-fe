
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        blue: {
          dark: "#2E5185",
        },
      },
      boxShadow: {
          quiz: "0px 5px 30px 26px rgba(152, 152, 152, 0.15)",
          answer: "5px 5px"
      }
    },
  },
  plugins: [],
};