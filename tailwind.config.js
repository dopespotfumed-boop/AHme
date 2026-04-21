/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'eco-green': '#2d5016',
        'eco-light-green': '#4a7c2c',
        'eco-cream': '#f5f1e8',
        'eco-brown': '#8b7355',
        'eco-dark': '#1a1a1a',
        'eco-primary': '#2d5016',
        'eco-accent': '#d4a574',
        'eco-off-white': '#f5f1e8',
        'eco-light': '#e8ede3',
      },
      borderRadius: {
        'premium': '12px',
        'button': '8px',
      },
      boxShadow: {
        'warm': '0 4px 6px -1px rgba(45, 80, 22, 0.1)',
        'warm-md': '0 10px 25px -5px rgba(45, 80, 22, 0.15)',
      }
    },
  },
  plugins: [],
}
