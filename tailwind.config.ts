import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: "#EEF2EF",
        ink: "#15243A",
        rule: "#C5D0CB",
        ready: "#1E6B52",
        hold: "#A86A12",
        stop: "#A3322B",
        agent: "#5A3FC0",
      },
      fontFamily: {
        sans: ['var(--font-schibsted-grotesk)', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'meta': ['13px', { lineHeight: '18px' }],
        'body': ['15px', { lineHeight: '22px' }],
        'panel': ['17px', { lineHeight: '24px' }],
        'section': ['22px', { lineHeight: '28px' }],
        'page': ['30px', { lineHeight: '36px' }],
        'landing': ['44px', { lineHeight: '52px' }],
      },
      borderWidth: {
        '3': '3px',
      },
      spacing: {
        '4': '4px',
      },
    },
  },
  plugins: [],
};
export default config;
