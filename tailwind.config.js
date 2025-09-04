/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./public/index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--tw-background))",
        foreground: "hsl(var(--tw-foreground))",
        primary: "hsl(var(--tw-primary))",
        "primary-foreground": "hsl(var(--tw-primary-foreground))",
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.25rem",
        "3xl": "1.5rem",
      },
      boxShadow: {
        elev: "0 10px 30px rgba(0,0,0,0.35)",
      },
    },
  },
  plugins: [],
};
