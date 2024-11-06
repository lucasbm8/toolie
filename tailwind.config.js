/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        white: "#ffffff",
        
        // Primary color and its variations
        "primary-light": "#DB6A5E",
        primary: "#DB4437",
        "primary-alt": "#A8321A",
        "primary-dark": "#861E15",
        "primary-clear": "#FAD4CE",
        
        // Secondary color and its variations (based on #53A3FA)
        "secondary-clear": "#E6F3FE",
        "secondary-light": "#9ACDFF",
        secondary: "#53A3FA",
        "secondary-alt": "#377DC4",
        "secondary-dark": "#265A8A",

        // Additional colors
        grey: "#F2F2F2",
        "grey-dark": "#333333",
        blue: "#003366",
      },
      fontFamily: {
        inter: ["Inter", "sans-serif", "Inter_400Regular", "sans-serif"],
      },
    },
  },
  plugins: [],
};
