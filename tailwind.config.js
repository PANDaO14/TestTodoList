/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      sans: ["Montserrat", 'sans-serif']
    },
    fontWeight: {
      normal: 500,
      bold: 700,
    },
    colors: {
      blue: '#30324B',
      bright_blue: '#0013FF',
      hover_blue: '#575A84',
      gray: '#A4A4A4',
      white: '#FFFFFF',
      green: '#6AD400',
      hover_green: '#CEFF9D',
      red: '#FF2F2F',
      hover_red: '#FFB8B8',
    },

    extend: {},
  },
  plugins: [],
}

