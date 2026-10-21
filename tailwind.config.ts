import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        onyx: {
          DEFAULT: 'var(--onyx)',
          2: 'var(--onyx-2)',
        },
        brass: {
          DEFAULT: 'var(--brass)',
          light: 'var(--brass-light)',
          line: 'var(--line)',
        },
        ivory: 'var(--ivory)',
        muted: 'var(--muted)',
      },
      fontFamily: {
        display: ['var(--font-display)', 'Georgia', 'serif'],
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        editorial: '-0.03em',
        label: '0.2em',
      },
      transitionTimingFunction: {
        editorial: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [],
};

export default config;
