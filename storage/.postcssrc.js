// https://github.com/michael-ciniawsky/postcss-load-config
/*module.exports = {
  "plugins": {
    "postcss-import": {},
    "postcss-url": {},
    // to edit target browsers: use "browserslist" field in package.json
    "autoprefixer": {}
  }
}*/

module.exports = {
  "plugins": {
    "postcss-import": {},
    "postcss-url": {},
    "postcss-aspect-ratio-mini": {},
    "postcss-write-svg": {
      utf8: false
    },
    "postcss-cssnext": {},
    "postcss-px-to-viewport": {
      viewportWidth: 350,     // (Number) The width of the viewport.
      unitPrecision: 6,       // (Number) The decimal numbers to allow the REM units to grow to.
      viewportUnit: 'vw',     // (String) Expected units.
      selectorBlackList: ['.ignore', '.hairlines'],  // (Array) The selectors to ignore and leave as px.
      minPixelValue: 1,       // (Number) Set the minimum pixel value to replace.
      mediaQuery: false       // (Boolean) Allow px to be converted in media queries.
    },

  }
}




//npm install postcss-aspect-ratio-mini --save-dev postcss-import
// postcss-url  postcss-aspect-ratio-mini  postcss-cssnext  autoprefixer  postcss-px-to-viewport  postcss-write-svg
//cssnano  postcss-aspect-ratio-mini