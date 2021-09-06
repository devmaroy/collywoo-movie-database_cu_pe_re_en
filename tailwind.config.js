module.exports = {
  purge: ['./dist/*.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      gridTemplateColumns: {
        'auto-fit': 'repeat(auto-fit, minmax(0, 1fr))',
        'auto-fill': 'repeat(auto-fill, minmax(0, 1fr))',
      },
      gridTemplateRows: {
        'auto-fit': 'repeat(auto-fit, minmax(0, 1fr))',
        'auto-fill': 'repeat(auto-fill, minmax(0, 1fr))',
      },
      colors: {
        primary: {
          900: '#04080f',
          800: '#080d16',
          600: '#0e131e',
          500: '#3c434f',
          400: '#737c8d',
          100: '#acb3c0',
        },
        secondary: {
          100: '#E2E2D5',
          200: '#888883',
        },
        white: '#dae3e5',
        whiteOff: '#dae3e5',
        whiteLight: '#a1a9b8',
        primaryOff: {
          900: '#507dbc',
          800: '#a1c6ea',
          700: '#bbd1ea',
        },
        danger: '#F8333C',
      },
      fontFamily: {
        body: ['Nunito'],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
