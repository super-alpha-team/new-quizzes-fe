const plugin = require('tailwindcss/plugin');

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
          lightDark: "#5379b0",
        },
        green: {
          light: "#90E198"
        },
        gray: {
          light: "#C5CFD1"
        },
        light: {
          medium: "#F5F7F8"
        },
        background: {
          mid: "#F5F7FB"
        }
      },
      boxShadow: {
          quiz: "0px 5px 50px 26px rgba(152, 152, 152, 0.15)",
          answer: ".25rem .25rem black",
      }
    },
  },
  plugins: [
    plugin(function({ addUtilities }) {
      addUtilities({
        '.no-scrollbar::-webkit-scrollbar': {
          'display': 'none'
        },
        '.no-scrollbar': {
          '-ms-overflow-style': 'none',  /* IE and Edge */
          'scrollbar-width': 'none' 
        }
      })
    })
  ]
};