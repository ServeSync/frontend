/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index/html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        login:
          'url(https://res.cloudinary.com/dboijruhe/image/upload/v1695882591/ServeSync/ta4io2ixqdmnh8f7zml0.png?fbclid=IwAR3EbHcT0dVTCiprdMyx1Nrt8cznEtZPauM2g3bIAh3npjHuTHiTKMaBK7g)'
      }
    }
  },
  plugins: [require('@tailwindcss/line-clamp')]
}
