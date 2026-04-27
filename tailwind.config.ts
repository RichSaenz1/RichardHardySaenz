import type { Config } from "tailwindcss";
import forms from "@tailwindcss/forms";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        viva: {
          ink: "#111827",
          muted: "#667085",
          line: "#E5E7EB",
          surface: "#F8FAFC",
          green: "#0F766E",
          mint: "#E8F7F3",
          gold: "#B7791F",
        },
      },
      boxShadow: {
        soft: "0 18px 60px rgba(17, 24, 39, 0.08)",
      },
    },
  },
  plugins: [forms],
};

export default config;
