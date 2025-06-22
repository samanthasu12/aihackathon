// tailwind.config.js
module.exports = {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',   // your React code
    './src/**/*.{css}'              // any global CSS files with @apply
  ],
  theme: { extend: {} },
  plugins: [],
}
