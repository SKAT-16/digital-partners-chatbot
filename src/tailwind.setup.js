tailwind.config = {
  theme: {
    extend: {
      screens: {
        xs: "320px", // Extra small devices
        sm: "640px", // Small devices
        md: "768px", // Medium devices
        lg: "1024px", // Large devices
        xl: "1280px", // Extra large devices
      },
      colors: {
        primary: {
          DEFAULT: "#2563EB",
          50: "#EBF2FF",
          100: "#DBEAFE",
          600: "#2563EB",
          700: "#1D4ED8",
        },
        neutral: {
          50: "#F9FAFB",
          100: "#F3F4F6",
          200: "#E5E7EB",
          800: "#1F2937",
        },
      },
      keyframes: {
        "bounce-subtle": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10%)" },
        },
        "pulse-glow": {
          "0%, 100%": {
            boxShadow: "0 0 0 0 rgba(37, 99, 235, 0.4)",
            transform: "scale(1)",
          },
          "50%": {
            boxShadow: "0 0 0 10px rgba(37, 99, 235, 0)",
            transform: "scale(1.05)",
          },
        },
        "slide-in": {
          "0%": {
            opacity: "0",
            transform: "translateY(20px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
      },
      animation: {
        "bounce-subtle": "bounce-subtle 1s ease-in-out infinite",
        "pulse-glow": "pulse-glow 2s infinite",
        "slide-in": "slide-in 0.3s ease-out",
        wiggle: "wiggle 1s ease-in-out infinite",
      },
    },
  },
};