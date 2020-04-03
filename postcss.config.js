/* eslint-disable global-require */

const pkg = require('./package.json');

const isDebug = !process.argv.includes('--release');

const config = {
  // The list of plugins for PostCSS
  // https://github.com/postcss/postcss
  plugins: [
    // Adds new pseudo elements to inputs for easy cross-browser styling.
    // https://github.com/seaneking/postcss-input-style
    require('postcss-input-style')(),
    // Replaces easing name from easings.net to cubic-bezier().
    // https://github.com/postcss/postcss-easings
    require('postcss-easings')(),
    // Transfer @import rule by inlining content, e.g. @import 'normalize.css'
    // https://github.com/postcss/postcss-import
    require('postcss-import')(),
    // W3C calc() function, e.g. div { height: calc(100px - 2em); }
    // https://github.com/postcss/postcss-calc
    require('postcss-calc')(),
    // Convert CSS shorthand filters to SVG equivalent, e.g. .blur { filter: blur(4px); }
    // https://github.com/iamvdo/pleeease-filters
    require('pleeease-filters')(),
    // Unwraps nested rules like how Sass does it
    // https://github.com/postcss/postcss-nested
    require('postcss-nested')(),
    // Generate pixel fallback for "rem" units, e.g. div { margin: 2.5rem 2px 3em 100%; }
    // https://github.com/robwierzbowski/node-pixrem
    require('pixrem')(),
    // Postcss flexbox bug fixer
    // https://github.com/luisrudge/postcss-flexbugs-fixes
    require('postcss-flexbugs-fixes')(),
    // PostCSS Preset Env, which allows you easily to use all the features in cssdb.
    // See what features in which stage in https://preset-env.cssdb.org/features
    // https://github.com/csstools/postcss-preset-env
    require('postcss-preset-env')({
      stage: 2,
      browsers: pkg.browserslist,
      autoprefixer: { flexbox: 'no-2009' },
    }),
    // CSS Nano options http://cssnano.co/
    require('cssnano')(
      isDebug
        ? false
        : {
            discardComments: { removeAll: true },
          },
    ),
  ],
};

module.exports = config;
