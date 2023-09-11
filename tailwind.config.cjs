/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin");

module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        primary: {
          main: '#0c4a6e',
          light: '#0ea5e9',
          dark: '#082f49',
        },
        error: {
          main: '#dc2626',
          light: '#ec4899',
          dark: '#991b1b',
        },
      },
      textColor: {
        primary: {
          main: '#0c4a6e',
          light: '#0ea5e9',
          dark: '#082f49',
        },
        error: {
          main: '#dc2626',
          light: '#ec4899',
          dark: '#991b1b',
        },
      },
      backgroundColor: {
        background: "#0f172a",
        primary: {
          main: '#0c4a6e',
          light: '#0ea5e9',
          dark: '#082f49',
        },
        error: {
          main: '#dc2626',
          light: '#ec4899',
          dark: '#991b1b',
        },
      },
    },
  },
  plugins: [
    plugin(function ({addVariant}) {
      addVariant('not-last-child', '&:not(:last-child)')
    }),
  ],
}
