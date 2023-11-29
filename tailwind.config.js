/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index/html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        login:
          'url(http://res.cloudinary.com/dboijruhe/image/upload/v1699332941/ServeSync/47e0df54-9753-4e46-979e-a65c20ef4158-background.png)'
      }
    },
    fontFamily: {
      Pacifico: 'Pacifico'
    }
  },
  plugins: [require('@tailwindcss/line-clamp'), require('tailwind-scrollbar')],
  variants: {
    scrollbar: ['rounded']
  }
}
