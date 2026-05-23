import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}"
  ],
  theme: {
    container: {
      center: true,
      padding: "1rem",
      screens: {
        "2xl": "1200px"
      }
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))"
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))"
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))"
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))"
        },
        success: "hsl(var(--success))",
        warning: "hsl(var(--warning))",
        nova: {
          ink: "#05060a",
          panel: "#10131d",
          pearl: "#f6f7fb",
          cyan: "#8be9ff",
          mint: "#a8ffd6",
          rose: "#ff9ecb",
          violet: "#b9a7ff",
          amber: "#ffd392"
        }
      },
      borderRadius: {
        xl: "1.25rem",
        "2xl": "1.5rem",
        "3xl": "2rem"
      },
      boxShadow: {
        glass: "0 24px 80px rgba(0, 0, 0, 0.34)",
        inset: "inset 0 1px 0 rgba(255, 255, 255, 0.08)"
      },
      fontFamily: {
        sans: ["var(--font-jakarta)", "system-ui", "sans-serif"]
      },
      backgroundImage: {
        "nova-radial": "radial-gradient(circle at top left, rgba(139, 233, 255, 0.18), transparent 34%), radial-gradient(circle at 80% 10%, rgba(255, 158, 203, 0.14), transparent 30%), linear-gradient(145deg, #05060a 0%, #0d111b 48%, #111827 100%)"
      }
    }
  },
  plugins: []
};

export default config;
