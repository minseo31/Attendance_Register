/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{tsx,ts,js,jsx,html}"],
  theme: {
    extend: {
      gridTemplateColumns: {
        col33: "repeat(33, minmax(0, 1fr))",
      },
      gridTemplateRows: {
        row12: "10% 20% 20% 20%",
      },
    },
  },
  plugins: [],
};
