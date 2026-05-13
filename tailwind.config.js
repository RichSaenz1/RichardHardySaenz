/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: "#061B33",
        "navy-2": "#0A2745",
        medical: "#0B66C3",
        cyan: "#26BFE8",
        softblue: "#EFF8FC",
        ice: "#EFF8FC",
        mist: "#F7FBFD",
        muted: "#64748B",
        borderblue: "#D9EAF5",
        gold: "#C9A76A",
      },
      fontFamily: {
        heading: ["Newsreader", "Cormorant Garamond", "Georgia", "serif"],
        body: ["Inter", "system-ui", "sans-serif"],
      },
      boxShadow: {
        premium: "0 30px 90px rgba(6, 27, 51, 0.14)",
        soft: "0 18px 54px rgba(11, 102, 195, 0.10)",
        glass: "0 24px 80px rgba(6, 27, 51, 0.16)",
      },
      borderRadius: {
        "2xl": "1rem",
      },
      backgroundImage: {
        "clinic-radial":
          "radial-gradient(circle at 16% 12%, rgba(38, 191, 232, 0.18), transparent 30%), radial-gradient(circle at 86% 8%, rgba(201, 167, 106, 0.16), transparent 26%), radial-gradient(circle at 50% 100%, rgba(11, 102, 195, 0.10), transparent 34%)",
      },
    },
  },
  plugins: [],
};
