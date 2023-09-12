const tailwindPaletteColors = require('tailwindcss/colors');

module.exports = {
  content: [
    './apps/webskills-demo/src/**/*.html',
    './dist/ng-components/esm2022/lib/**/*.mjs',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#3a405a',
        'primary-50': '#edecff',
        'primary-100': '#cdd5ed',
        'primary-200': '#b2b8d4',
        'primary-300': '#969cbc',
        'primary-400': '#8087aa',
        'primary-500': '#6b7398',
        'primary-600': '#5c6587',
        'primary-700': '#4a5270',
        'primary-800': '#3a405a',
        'primary-900': '#262c42',

        accent: '#54abde',
        'accent-50': '#e4f5fb',
        'accent-100': '#bae6f5',
        'accent-200': '#91d5ef',
        'accent-300': '#70c4e7',
        'accent-400': '#5eb8e3',
        'accent-500': '#54abde',
        'accent-600': '#4d9ed0',
        'accent-700': '#458bbc',
        'accent-800': '#407aa8',
        'accent-900': '#345a84',

        warn: tailwindPaletteColors.red['600'],
        'warn-50': tailwindPaletteColors.red['50'],
        'warn-100': tailwindPaletteColors.red['100'],
        'warn-200': tailwindPaletteColors.red['200'],
        'warn-300': tailwindPaletteColors.red['300'],
        'warn-400': tailwindPaletteColors.red['400'],
        'warn-500': tailwindPaletteColors.red['500'],
        'warn-600': tailwindPaletteColors.red['600'],
        'warn-700': tailwindPaletteColors.red['700'],
        'warn-800': tailwindPaletteColors.red['800'],
        'warn-900': tailwindPaletteColors.red['900'],

        'light-bg': '#edf5fc',
        'light-contrast-bg': '#e8e1db',
        'darker-bg': '#9fb7b9',
        'darker-contrast-bg': '#bcc1ba',
        'fitting-gray': '#404040',
        'fitting-dark-gray': '#2f2f2f',
        'wsk-link-blue': '#326785',
        'wsk-success': '#368d05',
      },
    },
  },
  plugins: [],
};
