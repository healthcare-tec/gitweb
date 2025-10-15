/** @type {import('tailwindcss').Config} */

import tailwindcssAnimate from "tailwindcss-animate";

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0ea5e9", // azul principal
        secondary: "#1e293b", // cinza-escuro
        border: 'var(--border)',
        ring: 'var(--ring)',
      },
    },
  },
  plugins: [tailwindcssAnimate],
};
