const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const base = require('./webpack.config.base.js')

module.exports = merge(base, {
  mode: 'development',
  devtool: 'inline-source-map',
  plugins: [
    new webpack.NamedModulesPlugin,
    new webpack.HotModuleReplacementPlugin
  ],
  devServer: {
    contentBase: path.resolve(__dirname, '../dist'),
    port: '8080',
    open: false, // 自动打开浏览器false
    hot: true
  }
})
