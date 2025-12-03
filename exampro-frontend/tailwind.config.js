/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0, transform: "translateY(4px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        slideUp: {
          "0%": { opacity: 0, transform: "translateY(40px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        dashboardReveal: {
          "0%": { opacity: 0, transform: "scale(0.9)" },
          "100%": { opacity: 1, transform: "scale(1)" },
        },
        iconPulse: {
          "0%,100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.15)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-15px)" },
        },
        float2: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-25px)" },
        },
        wave: {
          "0%": { backgroundPosition: "0 0" },
          "100%": { backgroundPosition: "200% 200%" },
        },
      },
      animation: {
        fadeIn: "fadeIn 0.15s ease-out",
        slideUp: "slideUp 0.9s ease-out",
        dashboardReveal: "dashboardReveal 0.7s ease-out",
        iconPulse: "iconPulse 1.5s infinite ease-in-out",
        float: "float 6s ease-in-out infinite",
        float2: "float2 8s ease-in-out infinite",
        wave: "wave 15s linear infinite",
      },
    },
  },
  plugins: [],
};
