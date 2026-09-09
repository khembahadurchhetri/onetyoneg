import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#0B0F17",
        bgAlt: "#10151F",
        surface: "#131826",
        border: "#1F2635",
        accent: "#1898F0",
        accentDim: "#0E4C77",
        text: "#F5F6F8",
        textMuted: "#9AA1AC"
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"]
      },
      letterSpacing: {
        tightest: "-0.03em"
      }
    }
  },
  plugins: []
};

export default config;
