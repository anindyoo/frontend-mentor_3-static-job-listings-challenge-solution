/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
    },
    extend: {
      colors: {
        // primary
        "desaturatedDarkCyan": "hsl(180, 29%, 50%)",

        // neutral
        "lightGrayishCyanBackground": "hsl(180, 52%, 96%)",
        "lightGrayishCyanFilterTablets": "hsl(180, 31%, 95%)",
        "darkGrayishCyan": "hsl(180, 8%, 52%)",
        "veryDarkGrayishCyan": "hsl(180, 14%, 20%)",
      },
    },
    dropShadow: {
      "lg-cyan": "0 1rem 1.25rem hsla(180, 29%, 50%, 24%)",
    }
  },
  plugins: [],
}

