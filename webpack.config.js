const webpack = require('webpack');

module.exports = {
  entry: [
    './src/main.js'
  ],
  output: {
    path: __dirname + '/dist',
    publicPath: '/dist/',
    filename: 'bundle.js',
  },
  module: {
    loaders: [
      {
        exclude: 'node_modules',
        loader: 'babel',
      },
    ],
  },
}
