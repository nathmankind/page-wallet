/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "pc-deepblue": "#1E4A86",
        "pc-primaryshade1": "#1B4278",
        "pc-primaryshade2": "#183B6B",
        "pc-lightblue": "#2F80ED",
        "primary": "#1F28EB",
        "primary-color": "#0066FF",
        "primary-light": "#ECF3FE",
        "pc-secondaryshade1": "#3B77DB",
        "pc-secondaryshade2": "#346AC3",
        "pc-yellow": "1E4A86",
        "pc-grey1": "F9F8F9",
        "pc-grey2": "#F4F4F4",
        "pc-grey3": "#E5E5E5",
        "pc-grey4": "#B6B6B6",
        "pc-grey5": "#8b8c8c",
        "pc-grey6": "#757575",
        "pc-grey7": "#2d2f30",
        "pc-grey8": "#151617",
        "pc-grey9": "#cccccc",
        "pc-grey10": "#4F4F4F",
        "pc-mint-green": "#18D7A9",
        "pc-information": "#46B655",
        "pc-success": "#46B655",
        "pc-error": "#AE0303",
        "pc-warning": "#F9971E",
        "mid-night": {
          40: "#A4A5A9",
          60: "#76777E",
          80: "#494A53",
          100: "#1B1D28",
        },
        forest: {
          100: "#4CAF50",
        },
        cherry: {
          100: "#FF0606",
        },
        sunfest: {
          100: "#FF9800",
        },
        pearl: {
          2: "#F4F7FA",
          3: "#DEE6EE",
          4: "#CDD5E1",
        },
      },
    }
  },
  plugins: [],
};
