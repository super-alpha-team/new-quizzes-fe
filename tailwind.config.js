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
        qyellow: {
          light: "#ffc00a",
          DEFAULT: "#ffa602",
          dark: "#d89e00",
        },
        qorange: {
          DEFAULT: "#eb670f",
          dark: "#e24104",
        },
        qred: {
          light: "#ff3355",
          DEFAULT: "#eb21b3c",
          dark: "#c60929",
        },
        qgreen: {
          light: "#66bf39",
          DEFAULT: "#26890C",
          dark: "#106b03",
        },
        qteal: {
          DEFAULT: "#0aa3a3",
          dark: "#028282",
        },        
        qblue: {
          DEFAULT: "#1368CE",
          dark: "#0542b9",
        },
        qpurple: {
          light: "#864cbf",
          DEFAULT: "#46178f",
          dark: "#25076b",
        }
      },
      boxShadow: {
          quiz: "0px 5px 50px 26px rgba(152, 152, 152, 0.15)",
          light: ".125rem .25rem rgba(255, 255, 255, 0.5)",
          dark: ".125rem .25rem black",
          answer: "0 .25rem #C01733",
          input: "0 .25rem #AEAFB4"
      },
      backgroundImage: {
        'hero-pattern': "url('https://scontent.xx.fbcdn.net/v/t1.15752-9/282120557_1464166197350782_291114088445928415_n.png?stp=dst-png_s600x600&_nc_cat=104&ccb=1-7&_nc_sid=aee45a&_nc_ohc=C9zbmgU3MxUAX-pw2NB&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.xx&oh=03_AVJ8tzm8V0mgphFC0nppLe4675hFuAC2sN4SKQMKKz5quQ&oe=62C39CD8')",
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