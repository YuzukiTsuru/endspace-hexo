/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './layout/**/*.ejs',
    './source/js/*.js'
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        endspace: {
          base: 'var(--endspace-bg-base)',
          primary: 'var(--endspace-bg-primary)',
          secondary: 'var(--endspace-bg-secondary)',
          yellow: '#FBFB45'
        }
      }
    }
  },
  plugins: []
}