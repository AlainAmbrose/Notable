/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        "slide-fade": {
          "0%": { transform: "translateY(20px)", opacity: "0" }, // Start slightly below and transparent
          "100%": { transform: "translateY(0)", opacity: "1" }, // End at the final position and fully visible
        },
      },
      animation: {
        "slide-fade": "slide-fade 0.5s ease-in-out", // Apply keyframes with a 0.5s duration
      },
    },
  },
  plugins: [],
};
