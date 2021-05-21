const nextEnv = require('next-env');
const dotenvLoad = require('dotenv-load');

dotenvLoad();

const { nextI18NextRewrites } = require('next-i18next/rewrites');

const withNextEnv = nextEnv();
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});
const withImages = require('next-images');

const isDebug = !process.argv.includes('--release');

const localeSubpaths = {
  ar: 'ar',
  de: 'de',
  en: 'en',
  es: 'es',
  fr: 'fr',
  it: 'it',
  jp: 'jp',
  pt: 'pt',
};

// next.config.js
module.exports = withNextEnv(
  withBundleAnalyzer(
    withImages({
      webpack: (config, { dev }) => {
        const newConfig = config;

        newConfig.module.rules.forEach((rule) => {
          if (rule.test && rule.test.toString().includes('.scss')) {
            // eslint-disable-next-line no-param-reassign
            rule.rules = rule.use.map((useRule) => {
              if (typeof useRule === 'string') {
                return { loader: useRule };
              }

              if (useRule.loader.startsWith('css-loader')) {
                return {
                  loader: useRule.loader,
                  options: {
                    ...useRule.options,
                    modules: false,
                  },
                };
              }

              return useRule;
            });

            delete rule.use; // eslint-disable-line no-param-reassign
          }
        });

        return newConfig;
      },
      cssLoaderOptions: {
        importLoaders: 1,
        localIdentName: isDebug
          ? '[name]-[local]-[hash:base64:5]'
          : '[hash:base64:5]',
      },
      cssModules: true,
      distDir: 'build',
      future: {
        webpack5: true,
      },
      rewrites: async () => nextI18NextRewrites(localeSubpaths),
      // experimental: { css: true },
      publicRuntimeConfig: {
        // Will be available on both server and client
        WEB_URL: process.env.WEB_URL || 'https://beta.onepace.net',
        localeSubpaths,
      },
      // serverRuntimeConfig: {
      //   // Will only be available on the server side
      //   // KEY: 'value'
      // },
      // target: 'serverless',
    }),
  ),
);
