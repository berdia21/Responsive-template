tailwind.config = {
  mode: "jit",
  theme: {
    extend: {
      colors: {
        "color-red-primary": "#FF3B30",
        "color-gray-light": "#EDF0F7",
        "color-gray-dark": "#4A5468",
        "color-gray-dark-low": "#E2E7F0",
      },
      screens: {
        xs: { max: "440px" },
        "xs-up": "441px",
        sm: { max: "575px" },
        "sm-up": "576px",
        md: { max: "776px" },
        "md-up": "775px",
        xl: { max: "1199px" },
        "xl-up": "1200px",
        "2xl-up": "1400px",
        "2xl": { max: "1399px" },
      },
    },
  },
};
