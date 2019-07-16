const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  entry: {
    app: './src/index.js',
    // another: './src/another-module.js'
  },
  output: {
    filename: '[name].[contenthash].js',
    chunkFilename: '[name].[contenthash].js',
    path: path.resolve(__dirname, '../dist'),
    // publicPath: '/dist/' //也会在服务器脚本中用到，以确保文件能在 http://localhost:port 下能正确访问
  },
  optimization: {
    moduleIds: 'hashed',
    runtimeChunk: 'single', // 运行时代码块单独打包
    splitChunks: { // 分块打包代码
      cacheGroups: {
        vender: { // 第三方库
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all' //代码块会被多个入口共享&按需加载
        }
      }
    }
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              // publicPath: '/css', // 默认为output
              hmr: process.env.NODE_ENV === 'development'
            }
          },
          'css-loader'
        ]
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'Output Manage',
      template: './src/index.html'
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].css', // 跟随配置入口文件名称
      chunkFilename: 'css/[name].css' // 异步加载(按需加载)方式的文件名称
    })
  ]
}
