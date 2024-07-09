/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      Poppins: "Poppins",
    },
    extend: {
      colors: {
        Teals: "#2f6C6D",
        HumingBird: "#d1f1ee",
        Yellow: "#e4d63b",
        Solitude: "#e9e9ea",
        gray: "#4B4B4C",
        lighGray: "#949494",
      },
      animation: {
        slide: "slide 25s linear inifinite",
      },
      keyframes: {
        slide: {
          "0%, 100%": { tranform: "translateX(5%)" },
          "50%": { tranform: "translateX(-120%)" },
        },
      },
    },
    screens: {
      xs: "480px",
      sm: "768px",
      md: "1060px",
    },
  },
  plugins: [],
};
