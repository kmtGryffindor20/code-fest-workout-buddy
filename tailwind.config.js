/** @type {import('tailwindcss').Config} */
module.exports = {
  mode:'jit',
  content: ["./src/**/*.{html,jsx}"],
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