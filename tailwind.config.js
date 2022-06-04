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
          light: "#90E198",
        },
        qgray: {
          light: "#F2F2F2",
          dark: "#333333",
        },
        light: {
          medium: "#F5F7F8",
        },
        background: {
          mid: "#F5F7FB",
        },
        qred: {
          DEFAULT: "#E21B3C",
          dark: "#C01733",
        },
        qblue: {
          DEFAULT: "#1368CE",
          dark: "#1059AF",
        },
        qyellow: {
          DEFAULT: "#D89E00",
          dark: "#B88600",
        },
        qgreen: {
          DEFAULT: "#26890C",
          dark: "#20750A",
        },
        qpurple: {
          DEFAULT: "#864CBF",
          dark: "#46178F",
          darker: "#230B47",
        }
      },
      boxShadow: {
          quiz: "0px 5px 50px 26px rgba(152, 152, 152, 0.15)",
          light: ".125rem .25rem rgba(255, 255, 255, 0.5)",
          dark: ".125rem .25rem black",
          answer: "0 .25rem #C01733",
      }
    },
    fontFamily: {
      'display': ['"Montserrat"', '"Noto Sans Arabic"', '"Helvetica Neue"', 'Helvetica', 'Arial', 'sans-serif'],
    }
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
      });
    })
  ]
};