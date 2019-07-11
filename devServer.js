const  path = require('path')
const webpack = require('webpack')
const webpackDevServer = require('webpack-dev-server')

const config = require('./webpack.config.js')
const options = {
  contentBase: path.resolve(__dirname, 'dsit'),
  hot: true,
  host: 'lcoalhost'
}

webpackDevServer.addDevServerEntrypoints(config, options)
const compiler = webpack(config)
const server = new webpackDevServer(compiler, options)

server.listen(8080, 'localhost', function(){
  console.log('dev server listening on port 8080')
})
