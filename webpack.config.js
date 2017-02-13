/* eslint-disable no-var */

var webpack = require('webpack');
var path = require('path');
var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: [
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/dev-server',
    './frontend/main'
  ],
  output: {
    path: __dirname,
    filename: 'bundle.js',
    publicPath: '/'
  },
  resolve: {
    extensions: ['', '.js']
  },
  devtool: 'eval-source-map',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new CopyWebpackPlugin([
    { from: 'dist/data.json', to: 'data.json' },
    { from: 'dist/images/', to: 'images/' },
    ])
  ],
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loaders: ['babel'],
        include: path.join(__dirname, 'frontend')
      },
      {
        test: /\.(css|scss)$/,
        loaders: [ 'css-loader', 'sass-loader' ],
        include: path.join(__dirname, 'frontend')
      }
    ]
  }
};
