import { Config } from "tailwindcss";

const config: Config = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        "spin-fast": "spin 0.3s linear infinite"
      },
      fontFamily: {
        poppins: [
          "Poppins",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "Noto Sans",
          "sans-serif",
          "Apple Color Emoji",
          "Segoe UI Emoji",
          "Segoe UI Symbol",
          "Noto Color Emoji"
        ]
      },
      container: {
        center: true,
        padding: "1.5rem"
      },
      gridTemplateColumns: {
        "2fr-1fr": "2fr 1fr",
        "min-max-16.25rem-1fr": "repeat(auto-fit, minmax(16.25rem, 1fr))"
      }
    }
  },
  plugins: []
};

export default config;
