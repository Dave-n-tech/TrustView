/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens:{
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px'
    },
    extend: {
      colors: {
        PrimaryBlue: 'rgba(8, 75, 176, 1)',
        GreyishPurple: 'ECE6F0',
        LightGreen: '29DC91'
      }
    },
  },
  plugins: [],
}

