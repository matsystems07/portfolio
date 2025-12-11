/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",  // ✅ Scans ALL components
  ],
  theme: { extend: {} },
  plugins: [],
}
