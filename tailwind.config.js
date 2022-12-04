/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './node_modules/flowbite-react/**/*.js'
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'main-purple': '#635FC7',
        'main-purple-light': '#A8A4FF',
        'very-dark-grey': '#20212C',
        'dark-grey': '#2B2C37',
        'medium-grey': '#828FA3',
        'light-grey': '#F4F7FD',
        'lines-dark': '#3E3F4E',
        'lines-light': '#E4EBFA',
        'red-main': '#EA5555',
        'red-light': '#FF9898'
      },
      boxShadow: {
        task: '0 4px 6px 0px rgba(54, 78, 126, 0.1)'
      },
      spacing: {
        4.5: '1.125rem'
      }
    }
  },
  plugins: [require('@headlessui/tailwindcss')]
  // plugins: [require("daisyui")],
  // plugins: [require('flowbite/plugin')]
}
