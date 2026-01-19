/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        primary: "var(--color-primary)",
        secondary: "var(--color-secondary)",
        tertiary: "var(--color-tertiary)",
        quaternary: "var(--color-quaternary)",
        quinary: "var(--color-quinary)",
        senary: "var(--color-senary)",
        septenary: "var(--color-septenary)",

        error: "var(--color-error)",
        success: "var(--color-success)",
        info: "var(--color-info)",
        favorite: "var(--color-favorite)",
        
        background: "var(--color-background)",
        'icon-form': "var(--bg-icon-form)",
        'method-selected': "var(--bg-method-selected)",
      },
      fontFamily: {
        primary: "var(--font-family-primary)",
        secondary: "var(--font-family-secondary)",
        tertiary: "var(--font-family-tertiary)",
      },
    },
  },
  plugins: [],
};
