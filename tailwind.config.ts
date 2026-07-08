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
          DEFAULT: "#EB2129",  // brand red, sampled from the Teguh Raya logo
          hover: "#F5333B",
        },
      },
      fontFamily: {
        display: ["var(--font-manrope)", "system-ui", "sans-serif"],
        body: ["var(--font-inter)", "system-ui", "sans-serif"],
        brand: ["var(--font-brand)", "system-ui", "sans-serif"],
      },
      maxWidth: {
        wrap: "72rem",
      },
    },
  },
  plugins: [],
};

export default config;
