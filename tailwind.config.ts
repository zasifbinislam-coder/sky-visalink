import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-outfit)", "system-ui", "sans-serif"],
      },
      colors: {
        navy: {
          50: "#f0f6ff",
          100: "#dbeafe",
          200: "#bfdbfe",
          300: "#93c5fd",
          400: "#60a5fa",
          500: "#3b82f6",
          600: "#2563eb",
          700: "#1d4ed8",
          800: "#1e40af",
          900: "#1e3a8a",
          950: "#0a1a3f",
        },
        sky: {
          50: "#f0f9ff",
          100: "#e0f2fe",
          200: "#bae6fd",
          300: "#7dd3fc",
          400: "#38bdf8",
          500: "#0ea5e9",
          600: "#0284c7",
          700: "#0369a1",
        },
        gold: {
          50: "#fffbea",
          100: "#fff3c4",
          200: "#fce588",
          300: "#fadb5f",
          400: "#f7c948",
          500: "#f0b429",
          600: "#de911d",
          700: "#cb6e17",
          800: "#a55611",
          900: "#7c400c",
          950: "#4a2606",
        },
        cream: {
          50: "#fffdf4",
          100: "#fefae3",
        },
      },
      backgroundImage: {
        "hero-gradient":
          "linear-gradient(135deg, rgba(10,26,63,0.88) 0%, rgba(240,180,41,0.32) 100%)",
        "navy-gradient":
          "linear-gradient(135deg, #0a1a3f 0%, #1e3a8a 55%, #0a1a3f 100%)",
        "sky-gradient": "linear-gradient(135deg, #0ea5e9 0%, #38bdf8 100%)",
        "gold-gradient":
          "linear-gradient(135deg, #f0b429 0%, #f7c948 45%, #de911d 100%)",
        "gold-navy-gradient":
          "linear-gradient(135deg, #f0b429 0%, #de911d 50%, #0a1a3f 100%)",
        "navy-gold-gradient":
          "linear-gradient(135deg, #0a1a3f 0%, #1e3a8a 55%, #de911d 100%)",
      },
      boxShadow: {
        glass: "0 8px 32px 0 rgba(10, 26, 63, 0.18)",
        soft: "0 10px 40px -10px rgba(240, 180, 41, 0.35)",
        gold: "0 12px 35px -12px rgba(240, 180, 41, 0.55)",
        card: "0 20px 50px -20px rgba(10, 26, 63, 0.35)",
      },
      animation: {
        "fade-in": "fadeIn 0.8s ease-out forwards",
        "slide-up": "slideUp 0.7s ease-out forwards",
        "float": "float 6s ease-in-out infinite",
        "shimmer": "shimmer 2.5s linear infinite",
        "pulse-ring": "pulseRing 1.6s ease-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-1000px 0" },
          "100%": { backgroundPosition: "1000px 0" },
        },
        pulseRing: {
          "0%": { transform: "scale(0.9)", opacity: "0.7" },
          "100%": { transform: "scale(1.6)", opacity: "0" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
