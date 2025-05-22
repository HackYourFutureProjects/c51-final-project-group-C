/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        Lora: ["Lora", "serif"],
        roboto: ["Roboto", "sans-serif"],
      },
      colors: {
        background: "var(--color-background)",
        border: "var(--color-border)",
        text: "var(--color-text)",
        accent: "var(--color-accent)",
      },
    },
  },
  plugins: [],
};
