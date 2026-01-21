/** @type {import('tailwindcss').Config} */
const rootConfig = require('../../packages/ui/tailwind.config.cjs');

module.exports = {
  ...rootConfig,
  content: [
    './App.{js,jsx,ts,tsx}',
    './index.js',
		'./src/module/Profile/index.tsx',
    './src/**/*.{js,jsx,ts,tsx}',
    '../../packages/ui/src/components/**/*.{js,jsx,ts,tsx}',
  ],
};
