/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,vue,ts}", "./nuxt.config.{js,ts}"],
  theme: {
    screens: {
      sm: "480px",
      md: "768px",
      lg: "992px",
      xl: "1280px",
      "2xl": "1536px",
      "3xl": "1920px",
    },
    extend: {
      colors: {
        eightyk: {
          400: "#2ebdd1",
          500: "#0aa9bf",
          600: "#0c8898",
          700: "#076875",
        },
        gray: {
          lightest: "#f1f1f1",
          light: "#aaaaaa",
          mid: "#484e51",
          dark: "#2a2e30",
        },
        black: {
          50: "#2a2e30",
        },
      },
      maxWidth: {
        "8xl": "1440px",
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
