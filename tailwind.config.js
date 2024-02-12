/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        satoshi: ["Satoshi", "sans-serif"],
        inter: ["Inter", "sans-serif"],
      },
      colors: {
        transparent: "transparent",
        current: "currentColor",
        white: "#ffffff",
        black: "#000000",
        grey: "#808080",
        "red": "#FF0000",
        "green": "#00C853",
        "light-pink": "#FFB6C1",
        "tinder-whiteish": "#F5F5F5",
        "tinder-pink": "#FE3C72",
        "tinder-gray": "#424242"
      },
      backgroundImage: (theme) => ({
        "tinder-1": "url('/images/ai_bot_kuva_3.png')",
      }),
    },
  },
  plugins: [],
};
