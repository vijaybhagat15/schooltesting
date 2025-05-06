/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: [
    // old teal colors
    "bg-white",
    "bg-teal-100",
    "bg-yellow-100",
    "bg-teal-700",
    "hover:bg-teal-900",
    "bg-teal-900",
    "text-white",
    "text-teal-900",
    "text-teal-700",
    "text-2xl",
    "text-lg",
    "border-gray-200",
    "border-b-2",
    "border-teal-600",
    "border-2",

    // ✅ new orange styles
    "bg-orange-100",
    "bg-orange-700",
    "hover:bg-orange-900",
    "bg-orange-900",
    "text-orange-900",
    "text-orange-700",
    "border-orange-600",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
