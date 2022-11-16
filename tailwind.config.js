/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,vue,ts}", "./nuxt.config.{js,ts}"],
  theme: {
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
  plugins: [],
};
