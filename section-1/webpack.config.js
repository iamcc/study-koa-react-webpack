/*
* @Author: CC
* @Date:   2015-08-11 15:02:57
* @Last Modified by:   CC
* @Last Modified time: 2015-08-11 17:57:31
*/

'use strict'

const webpack = require('webpack')
const path = require('path')

module.exports = {
  entry: {
    app: (process.env.NODE_ENV === 'prod'
      ? './client/index.js'
      : [
        'webpack-dev-server/client?http://127.0.0.1:3001',
        'webpack/hot/dev-server',
        './client/index.js'
      ]
    ),
    lib: [
      'react',
      'react-router',
      'jquery',
      'antd'
    ]
  },
  output: {
    path: path.join(__dirname, 'assets'),
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'prod' ? '/' : 'http://127.0.0.1:3001/'
  },
  devServer: {
    hot: true,
    port: 3001,
    historyApiFallback: true,
    publicPath: 'http://127.0.0.1:3001/'
  },
  resolve: {
    modulesDirectories: ['node_modules', 'client']
  },
  plugins: (process.env.NODE_ENV === 'prod'
    ? [new webpack.optimize.CommonsChunkPlugin('lib', 'lib.js')]
    : [new webpack.optimize.CommonsChunkPlugin('lib', 'lib.js'), new webpack.HotModuleReplacementPlugin(), new webpack.NoErrorsPlugin()]
  ),
  module: {
    loaders: [
      { test: /\.css$/, loader: 'style!css' },
      { test: /\.less$/, loader: 'style!css!less' },
      { test: /\.jsx?$/, loader: (process.env.NODE_ENV === 'prod' ? '' : 'react-hot!') + 'babel', exclude: /node_modules/ },
      { test: /\.(woff2?|eot|svg|ttf|jpg|png)$/, loader: 'file' },
    ]
  }
}