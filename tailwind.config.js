/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/index.html", "./public/**/*.{html,js}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "#020617",
        surface: "#0B1220",
        card: "#111A2E",
        "card-hover": "#141F38",
        border: "#22304A",
        primary: "#0F172A",
        foreground: "#F8FAFC",
        muted: "#94A3B8",
        "muted-dim": "#64748B",
        accent: {
          DEFAULT: "#22C55E",
          hover: "#16A34A",
          dim: "#14532D",
        },
        gold: {
          DEFAULT: "#F59E0B",
          hover: "#D97706",
        },
        danger: "#EF4444",
        ring: "#22C55E",
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["'JetBrains Mono'", "ui-monospace", "monospace"],
      },
      boxShadow: {
        glow: "0 0 24px rgba(34,197,94,0.25)",
        "glow-gold": "0 0 24px rgba(245,158,11,0.2)",
        card: "0 1px 0 0 rgba(255,255,255,0.04) inset, 0 8px 24px rgba(0,0,0,0.4)",
      },
      backgroundImage: {
        "grid-fade": "linear-gradient(to bottom, rgba(2,6,23,0) 0%, #020617 100%)",
      },
      animation: {
        "fade-up": "fadeUp 0.6s ease-out forwards",
        ticker: "ticker 30s linear infinite",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: 0, transform: "translateY(16px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        ticker: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
    },
  },
  plugins: [],
};
