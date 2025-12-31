import typography from '@tailwindcss/typography'

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        fadeIn: {
          '0%': {opacity: '0'},
          '100%': {opacity: '1'},
        },
        slideIn: {
          '0%': {transform: 'translateX(100%)'},
          '100%': {transform: 'translateX(0)'}
        },
         slideInLeft: {
          '0%': {transform: 'translateX(-100%)'},
          '100%': {transform: 'translateX(0)'}
        },
      },

      animation: {
        fadeIn: 'fadeIn 0.3s ease-out',
        slideIn: 'slideIn 0.3s ease-out',
        slideInLeft: 'slideInLeft 0.3s ease-out',
        spinSlow: 'spin 2s linear infinite'
      }
    },
  },
  plugins: [
    typography, // aquí va el plugin
  ],
}
