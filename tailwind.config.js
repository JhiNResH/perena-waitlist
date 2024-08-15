/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-cream': 'var(--brand-cream)',
        'brand-purple': 'var(--brand-purple)',
        'off-white': '#fffef7', // 添加一個接近圖片背景的顏色
        'perena-blue': '#2a136a', // 添加 Perena 標誌中的深藍色
      },
      fontFamily: {
        'plusjakartasans': ['Plusjakartasans', 'sans-serif'],
      },
      fontSize: {
        'base': '14px',
      },
      lineHeight: {
        'base': '20px',
      },
    },
    },
  plugins: [import('tailwindcss-animate')],
}