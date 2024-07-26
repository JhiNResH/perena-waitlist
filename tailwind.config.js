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
        'brand-purple': 'var(--brand-purple)'
      }
    },
  },
  plugins: [import('tailwindcss-animate')],
}