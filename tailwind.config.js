/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./node_modules/flowbite/dist/flowbite.min.js"
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('daisyui'),
    require('flowbite/plugin')
  ],
}

