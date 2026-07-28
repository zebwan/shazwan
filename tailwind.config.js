/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        cream: '#FFFCF2',
        ink: '#252422',
        'ink-2': '#1D1B18',
        'ink-3': '#191714',
        orange: '#EB5E28',
        'orange-deep': '#C94D1E',
      },
      fontFamily: {
        disp: ['"Zalando Sans"', 'system-ui', 'sans-serif'],
        mono: ['"Geist Mono"', 'ui-monospace', 'monospace'],
      },
    },
  },
  plugins: [],
}
