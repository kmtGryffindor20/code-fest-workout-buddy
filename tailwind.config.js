/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      colors:{
        'gunmetal':'#19222C',
        'seasalt':'#7D8491',
        'amber':'#FFC107',
        'white':'#FFFDFD',
        'night':'#080C0F'
      }
    },
  },
  plugins: [],
}