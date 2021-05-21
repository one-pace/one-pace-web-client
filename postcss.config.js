/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

/* eslint-disable global-require */

const pkg = require('./package.json');

const isDebug = !process.argv.includes('--release');

const config = {
  // The list of plugins for PostCSS
  // https://github.com/postcss/postcss
  plugins: [
    // Adds new pseudo elements to inputs for easy cross-browser styling.
    // https://github.com/seaneking/postcss-input-style
    'postcss-input-style',
    // Replaces easing name from easings.net to cubic-bezier().
    // https://github.com/postcss/postcss-easings
    'postcss-easings',
    // Transfer @import rule by inlining content, e.g. @import 'normalize.css'
    // https://github.com/postcss/postcss-import
    'postcss-import',
    // W3C calc() function, e.g. div { height: calc(100px - 2em); }
    // https://github.com/postcss/postcss-calc
    'postcss-calc',
    // Convert CSS shorthand filters to SVG equivalent, e.g. .blur { filter: blur(4px); }
    // https://github.com/iamvdo/pleeease-filters
    'pleeease-filters',
    // Unwraps nested rules like how Sass does it
    // https://github.com/postcss/postcss-nested
    'postcss-nested',
    // Generate pixel fallback for "rem" units, e.g. div { margin: 2.5rem 2px 3em 100%; }
    // https://github.com/robwierzbowski/node-pixrem
    'pixrem',
    // Postcss flexbox bug fixer
    // https://github.com/luisrudge/postcss-flexbugs-fixes
    'postcss-flexbugs-fixes',
    // PostCSS Preset Env, which allows you easily to use all the features in cssdb.
    // See what features in which stage in https://preset-env.cssdb.org/features
    // https://github.com/csstools/postcss-preset-env
    [
      'postcss-preset-env',
      {
        stage: 2,
        browsers: pkg.browserslist,
        autoprefixer: { flexbox: 'no-2009' },
      },
    ],
    // CSS Nano options http://cssnano.co/
    [
      'cssnano',
      isDebug
        ? false
        : {
            discardComments: { removeAll: true },
          },
    ],
  ],
};

module.exports = config;
