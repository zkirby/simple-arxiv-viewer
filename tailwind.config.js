/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "pastel-green-200": "#a3e4d7",
        "pastel-blue-200": "#aed6f1",
        "pastel-pink-200": "#f5b7b1",
        "pastel-yellow-200": "#f9e79f",
        "pastel-orange-200": "#f0b27a",
        "pastel-purple-200": "#d2b4de",
        "pastel-red-200": "#f1948a",
      },
    },
  },
  plugins: [],
};
