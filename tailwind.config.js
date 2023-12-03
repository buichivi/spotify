/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      spacing: {
        'main-layout': 'calc(100vh - 8px * 3 - 66px)',
        'playback': '66px',
        'nav': '64px',
        'category-gap': '24px',
        'category-item': 'calc((100% - (24px * 4)) / 5)',
        'genre': 'calc((100% - 12px * 4) / 5)'
      },
      boxShadow: {
        'blur': '0 9px 6px 5px rgba(0, 0, 0, 0.5)',
        'fade': '0px 8px 20px 0px rgb(0, 0, 0, 0.4)'
      },
      colors: {
        
      },
      flex: {
        '364': '0 1 364px'
      }
    },
  },
  plugins: [],
}