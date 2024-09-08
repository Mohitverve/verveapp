/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}', // This ensures Tailwind scans all files in the src folder for Tailwind classes
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
