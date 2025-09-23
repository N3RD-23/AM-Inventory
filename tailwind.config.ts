import type { Config } from "tailwindcss";

const { nextui } = require("@nextui-org/react");

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        accent: {
          DEFAULT: "#111827",
          fg: "#F9FAFB"
        },
        brand: {
          DEFAULT: "#111111",
          light: "#1f2937",
          ring: "#8b5cf6"
        }
      },
      boxShadow: {
        "aceternity": "0 10px 25px -10px rgba(0,0,0,0.3)"
      },
      borderRadius: {
        "2xl": "1rem"
      }
    },
  },
  plugins: [nextui()],
};
export default config;
