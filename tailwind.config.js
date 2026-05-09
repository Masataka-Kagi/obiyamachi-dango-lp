/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        serif: [
          '"Shippori Mincho"',
          '"Noto Serif JP"',
          '"Yu Mincho"',
          '"YuMincho"',
          '"Hiragino Mincho ProN"',
          "serif"
        ],
      },
    },
  },
  plugins: [],
};
