/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index/html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        login:
          'url(https://s3-alpha-sig.figma.com/img/a061/0c2e/fcf80a089306f834367471b29c2d7519?Expires=1699833600&Signature=PQBuDDMvPKT7QSF8cFgSF8x3Ric0nfFP431E~r56-51MP0g8YROd9rqvDgjMDCntBDOTP7iMO1JZbfBqT8Zs0l5fG7Iu5pZ4PJa36xY3fTp-S6dJxQNEvM78LDimqF1fHZKMiTgScpNdv~dzN8QKcr7dKuwqV9nplmeI0qpWwkNqrpH-8lyYiy4fE1q2McTcd1Lmqi-SBBK0Reaqil9dlfdJd8jFQjhcoq-mYdDy7QMdNq2x5vxKkguw3w0jroORq0DqnWg8JQE2WNT4a2aRAcIOxlpz9j-rJCWSeK9FdoguSJU~SkPM8nXFZLlsIF-KK2KmN75OjCbDziUmuVe9ig__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4)'
      }
    }
  },
  plugins: [require('@tailwindcss/line-clamp')]
}
