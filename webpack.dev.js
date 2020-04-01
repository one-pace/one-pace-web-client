const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/components/index',
  output: {
    path: path.join(__dirname, 'dist/'),
    filename: 'index.js',
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      jquery: 'jquery',
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
    }),
    new CopyWebpackPlugin([
      'src/.htaccess',
      'src/about.html',
      'src/overview.html',
    ]),
  ],
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.s?css$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        include: [
          path.join(__dirname, '/src'),
          path.join(__dirname, 'node_modules/reflux-core'),
        ],
        options: {
          presets: ['react', 'es2015', 'stage-1', 'stage-2'],
        },
      },
      {
        test: /\.(woff2?|png|jpe?g|ico|ttf|otf|eot|svg|mp3)(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file-loader',
        options: {
          esModule: false,
          name: '[name].[ext]',
          outputPath: 'assets/',
        },
      },
      {
        test: /\.html$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
        },
      },
    ],
  },
  watch: true,
  watchOptions: {
    ignored: /node_modules/,
  },
};
