var webpack = require('webpack');
var path = require('path');

module.exports = {
  entry: [
    './src/index'
  ],
  module: {
    preLoaders: [
      { test: /\.js$|\.jsx$/, loader: 'eslint', exclude: /node_modules/ }
    ],
    loaders: [
      {
        test: /\.js$|\.jsx$/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react', 'stage-0'],
        },
        exclude: /node_modules/
      },
      { test: /\.s?css$/, loader: 'style!css!sass' },
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  output: {
    path: path.join(__dirname, '/dist'),
    publicPath: '/',
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: './dist',
    hot: true
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ]
};
