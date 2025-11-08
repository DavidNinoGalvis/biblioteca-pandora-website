import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        blueSky: "#0ea5e9",
        blueDeep: "#0369a1",
        graySoft: "#d1d5db",
        grayMuted: "#6b7280",
        yellowWarm: "#fef3c7",
        orangeAccent: "#fb923c",
        greenSuccess: "#10b981",
        redDanger: "#ef4444",
      },
      borderRadius: {
        soft: "12px",
        round: "24px",
      },
      boxShadow: {
        soft: "0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.06)",
        medium: "0 4px 6px rgba(0, 0, 0, 0.1)",
      },
    },
  },
  plugins: [],
};

export default config;
