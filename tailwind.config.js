/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: [
    'hidden',
    'block',
  ],
  theme: {
    screens: {
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
    },
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
      animation: {
        'spin': 'spin 10s linear infinite',
      },
      keyframes: {
        spin: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        }
      }    },
    },
  plugins: [import('tailwindcss-animate')],
}