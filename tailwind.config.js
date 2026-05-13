/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: "#0D2B45",
        "navy-2": "#0D1F2D",
        medical: "#1B6B9A",
        cyan: "#5B9EC9",
        softblue: "#E0EEF7",
        ice: "#E0EEF7",
        mist: "#F5F7F9",
        muted: "#2C4A5E",
        borderblue: "#E0EEF7",
        gold: "#C9A84C",
      },
      fontFamily: {
        heading: ["Cormorant Garamond", "Newsreader", "Georgia", "serif"],
        body: ["Inter", "system-ui", "sans-serif"],
      },
      boxShadow: {
        premium: "0 30px 90px rgba(13, 43, 69, 0.14)",
        soft: "0 18px 54px rgba(27, 107, 154, 0.10)",
        glass: "0 24px 80px rgba(13, 43, 69, 0.16)",
      },
      borderRadius: {
        "2xl": "1rem",
      },
      backgroundImage: {
        "clinic-radial":
          "radial-gradient(circle at 16% 12%, rgba(91, 158, 201, 0.18), transparent 30%), radial-gradient(circle at 86% 8%, rgba(201, 168, 76, 0.16), transparent 26%), radial-gradient(circle at 50% 100%, rgba(27, 107, 154, 0.10), transparent 34%)",
      },
    },
  },
  plugins: [],
};
