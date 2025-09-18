/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'hb-navy': '#092244',
        'hb-darkblue': '#0a3d62',
        'hb-blue': '#196ca1',
        'hb-lightblue': '#7ad1e4',
      },
    },
  },
  plugins: [],
}