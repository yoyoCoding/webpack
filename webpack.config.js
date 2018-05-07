const glob = require('glob');

const uglify = require('uglifyjs-webpack-plugin');
const htmlPlugin = require('html-webpack-plugin');
const extractTextPlugin = require('extract-text-webpack-plugin');
const purifyCssPlugin = require('purifycss-webpack');

module.exports = {
	devtool: "eval-source-map",
	entry: __dirname + "/src/main.js",
	output: {
		path: __dirname + "/dist",
		filename: "bundle.js",
		publicPath: "/dist/"
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				use: extractTextPlugin.extract({
					fallback: "style-loader",
					use: [
						{
							loader: 'css-loader',
							options: {importLoders: 1}
						},
						'postcss-loader'
					]
				})
			},
			{
				test: /\.(png|jpg|gif)$/,
				use: [
					{
						loader: 'url-loader',
						options: {
							limit: 50000,
							outputPath: 'images/'
						}
					}
				]
			},
			{
				test: /\.(htm|html)$/i,
				use: ['html-withimg-loader']
			},
			{
				test: /\.less$/,
				use: extractTextPlugin.extract({
					use: [
						{loader: 'css-loader'},
						{loader: 'less-loader'}
					],
					fallback: 'style-loader'
				})
			},
			{
				test: /\.scss$/,
				use: extractTextPlugin.extract({
					use: [
						{loader: 'css-loader'},
						{loader: 'sass-loader'}
					],
					fallback: 'style-loader'
				})
			}
		]
	},
	plugins: [
		new uglify(),
		new htmlPlugin({
			minify: {
				removeAtrributeQuotes: true
			},
			hash: true,
			template: './src/index.html'
		}),
		new extractTextPlugin('css/index.css'),
		new purifyCssPlugin({
			paths: glob.sync(__dirname + '/dist/*.html')
		})
	],
	devServer: {
		contentBase: __dirname + "/dist",
		host: "localhost",
		port: "1818"
	}
};