/** @type {import('tailwindcss').Config} */
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
    },
  },
  plugins: [],
};