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
      colors: {
        green3: "#55AD9B",
        green2: "#95D2B3",
        green1: "#D8EFD3",
        whiteGreen: "#F1F8E8",
      },
    },
  },
  plugins: [],
};
