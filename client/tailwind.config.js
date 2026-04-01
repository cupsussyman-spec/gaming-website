/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        stone: '#1a1a2e',
        creeper: '#4CAF50',
        gold: '#FFD700',
        'stone-dark': '#0d0d1a',
        'stone-mid': '#2a2a4a',
        'creeper-dark': '#2d7a2d',
        'gold-dark': '#b8960c',
      },
      fontFamily: {
        pixel: ['"Press Start 2P"', 'monospace'],
        vt: ['VT323', 'monospace'],
      },
      borderRadius: {
        none: '0',
        sm: '0',
        DEFAULT: '0',
        md: '0',
        lg: '0',
        xl: '0',
        '2xl': '0',
        '3xl': '0',
        full: '0',
      },
    },
  },
  plugins: [],
};
