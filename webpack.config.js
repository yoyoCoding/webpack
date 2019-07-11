const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const webpack = require('webpack')

module.exports = {
  entry: {
    app: './src/index.js'
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/' //也会在服务器脚本中用到，以确保文件能在 http://localhost:port 下能正确访问
  },
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'Output Manage'
    }),
    new webpack.NamedModulesPlugin,
    new webpack.HotModuleReplacementPlugin
  ],
  devServer: {
    contentBase: path.resolve(__dirname, './dist'),
    port: '8080',
    // open: true, // 自动打开浏览器
    hot: true
  },
}
