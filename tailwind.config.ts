import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        blue: {
          300: '#C6DFFE',
          500: '#0465DD',
          600: '#035AC5',
          900: '#002859',
        },
        gray: {
          200: '#F9FAFC',
          300: '#E5E9F2',
          400: '#C0CCDA',
          500: '#647184',
          600: '#EFF2F7',
        }
      }
    },
  },
  plugins: [],
};
export default config;
