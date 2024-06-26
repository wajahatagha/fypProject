/** @type {import('tailwindcss').Config} */
export default {
  content: [ "./index.html",
  "./src/**/*.{js,ts,jsx,tsx}",],
  theme: {
    extend: {
      colors: {
        primary: '#c8a2c8',
      }
    },
  },
  plugins: [
    require("tailwindcss-animate"),
  ],
}

