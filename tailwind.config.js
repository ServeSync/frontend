/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index/html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        authentication: 'url(../../src/modules/Share/assets/images/background.png)'
      }
    }
  },
  plugins: []
}
