import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0B0C0E",        // page background
        charcoal: "#15171C",   // raised surfaces
        steel: "#2A2E36",      // borders, dividers
        fog: "#A7ADB8",        // muted text
        paper: "#F5F6F8",      // primary text
        accent: {
          DEFAULT: "#C8102E",  // deep red — the single brand accent
          hover: "#E01E30",
        },
      },
      fontFamily: {
        display: ["var(--font-manrope)", "system-ui", "sans-serif"],
        body: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      maxWidth: {
        wrap: "72rem",
      },
    },
  },
  plugins: [],
};

export default config;
