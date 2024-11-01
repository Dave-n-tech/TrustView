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
      lg: '1024px',
      xl: '1440px'
    },
    extend: {
      colors: {
        PrimaryBlue: 'rgba(8, 75, 176, 1)',
        GreyishPurple: 'rgba(236, 230, 240, 1)',
        LightGreen: '29DC91'
      }
    },
  },
  plugins: [],
}

