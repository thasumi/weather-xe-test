/** @type {import('tailwindcss').Config} */
import scrollbarHide from "tailwind-scrollbar-hide";

export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", "system-ui", "sans-serif"],
      },
      colors: {
        // text
        "text-primary": "#001133",
        "text-muted": "#989EAA",

        // weather palette
        "weather-sky-light": "#E4F0FE",
        "weather-sky": "#C3E0FB",
        "weather-mint": "#CDF0EB",
        "weather-sun": "#FFF4DA",
        "weather-rose": "#FDD4D7",
      },
      screens: {
        'sm': '360px',
        // => @media (min-width: 640px) { ... }

        'md': '768px',
        // => @media (min-width: 768px) { ... }

        'lg': '1024px',
        // => @media (min-width: 1024px) { ... }

        'xl': '1280px',
        // => @media (min-width: 1280px) { ... }
      }
    },
  },
  plugins: [scrollbarHide],
};