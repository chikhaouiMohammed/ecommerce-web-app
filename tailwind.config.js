/** @type {import('tailwindcss').Config} */
export default {
  
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        'open': ['Open Sans', 'sans-serif'],
      },
      colors:{
        darkGrey: '#3C4242',
        mediumGrey: '#807D7E',
        aztecPurple: '#8A33FD',
        gray: {
          500: '#6B7280',
        },
      },
      daisyui: {
        themes: ["light", "dark", "cupcake"],
      },
    },
  },
  plugins: [
    
    require('daisyui'),
    require('flowbite/plugin')
    
  ],
}

