import typography from '@tailwindcss/typography'

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    typography, // aquí va el plugin
  ],
}
