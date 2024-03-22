/** @type {import('tailwindcss').Config}
export default {
  content: [],
  theme: {
    extend: {},
  },
  plugins: [],
}*/

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        bodyPurple: "#AFB3FF",
        // borderPurple: "#656ED3",
        borderPurple: "#651882",
        offWhite: "#EBEFFF",
        darkPink: "#c24595"
      }
    }
  },
  plugins: []
};
