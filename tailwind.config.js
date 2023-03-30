/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#646ff0",
        lightgray: "#646681",
        gray: "#ecedf6",
        warning: "#fb7185",
        darkgray: "#292d3e",
      },
    },
  },
  plugins: [],
};
