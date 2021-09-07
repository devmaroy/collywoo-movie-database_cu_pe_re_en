const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = {
  entry: './app/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index_bundle.js',
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: ['babel-loader', 'eslint-loader'],
      },
      {
        test: /\.(css)$/,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: 'file-loader',
      },
      {
        test: /\.svg$/,
        use: 'svg-url-loader',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({ template: 'app/index.html' }),
    new Dotenv(),
  ],
  mode: 'development',
  devServer: {
    historyApiFallback: true,
  },
};
