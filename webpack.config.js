const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const Dotenv = require('dotenv-webpack');

const { NODE_ENV } = process.env;
const inProduction = NODE_ENV === 'production';

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
        use: [
          inProduction ? MiniCssExtractPlugin.loader : 'style-loader',
          'css-loader',
          'postcss-loader',
        ],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
    ],
  },
  optimization: {
    minimizer: [
      // For webpack@5 you can use the `...` syntax to extend existing minimizers
      // (i.e. `terser-webpack-plugin`), uncomment the next line
      // `...`,
      new CssMinimizerPlugin(),
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'app/index.html',
      favicon: './app/images/favicon.png',
    }),
    new Dotenv({ systemvars: true, silent: true, allowEmptyValues: true }),
  ].concat(
    inProduction
      ? [new MiniCssExtractPlugin({ filename: 'bundle.min.css' })]
      : [],
  ),
  mode: inProduction ? 'production' : 'development',
  devtool: inProduction ? 'source-map' : 'inline-source-map',
  devServer: {
    historyApiFallback: true,
  },
};
