# webpack
## webpack3+ studying

## 1.配置入口、出口
多入口多出口配置：
`entry:{
	entry: '',
	entry2: ''
}
output:{
	path: '',
	filename: '[name].js'
}`

## 2.配置本地服务器
npm下载(webpack-dev)->devServer配置

## 3.loader下载配置[module]
npm下载->mudule配置->js import
loaders三种写法

type1:

`module: {
	rules: [
		{
			test: /\.css$/
			use: ['style-loader','css-loader']
		}
	]
}`

type2:

`module: {
	rules: [
		{
			test: /\.css$/
			loader: ['style-loader','css-loader']
		}
	]
}`

type3:

`module: {
	rules: [
		{
			test: /\.css$/
			loader: [
				{
					loader: 'style-loader'
				},
				{
					loader: 'css-loader'
				}
			]
		}
	]
}`

### (1)style-loader/css-loader
**style-loader:** 用来将css插入到页面的style标签
**css-loader:** 用来处理css中的url
### (2)file-loader/url-loader
**file-loader:**
解决引用路径的问题，webpack将各个模块打包成一个文件，因此我们样式中的url路径是相对入口html页面的，而不是相对于原始css文件所在的路径的。这就会导致图片引入失败。这个问题是用file-loader解决的，file-loader可以解析项目中的url引入（不仅限于css），根据我们的配置，将图片拷贝到相应的路径，再根据我们的配置，修改打包后文件引用路径，使之指向正确的文件。

**url-loader:** (url-loader封装了file-loader,可以不用下载file-loader)
如果图片较多，会发很多http请求，会降低页面性能。这个问题可以通过url-loader解决。url-loader会将引入的图片编码，生成dataURl。相当于把图片数据翻译成一串字符。再把这串字符打包到文件中，最终只需要引入这个文件就能访问图片了。当然，如果图片较大，编码会消耗性能。因此url-loader提供了一个limit参数，小于limit字节的文件会被转为DataURl，大于limit的还会使用file-loader进行copy。
### (3)html-withimg-loader: 在html中使用<img>标签引入图片
### (4)less/less-loader: 解析less文件
### (5)node-sass/sass-loader: 解析scss文件
### (6)postcss-loader: css处理平台

## 4.插件下载配置[plugins]
npm下载(js压缩内置无需下载)->配置文件引入require->plugins new(多个以,分隔)
### (1)uglifyjs(uglifyjs-webpack-plugin) - js压缩
### (2)htmlPlugin(html-webpack-plugin) - html打包
### (3)extractTextPlugin(extract-text-webpack-plugin) - (打包后的)文件分离
### (4)autoprefixer - css自动添加前缀
### (5)purifycss-webpack - 消除无用的css(需要安装purify-css包,必须配合extract-text-webpack-plugin)
### (6)ProvidePlugin - webpack内置插件,全局引入第三方类库
引入第三方类库的两种方法
首先npm install 第三方类库
``type1:`` 
在相关文件直接引入(以jquery为例)：import $ from 'jquery' 
[引用后不管你在代码中使用不适用该类库,都会把该类库打包起来,这样有时就会让代码产生冗余]
``type2:`` 
使用webpack自带插件ProvidePlugin,在webpack.config.js中配置
[引用后只有在类库使用时,才按需进行打包]
### (7)BannerPlugin - webpack内置插件,自动添加版权或开发者声明
### (8)optimize - webpack内置插件,打包优化
### (9)copyWebpackPlugin(copy-webpack-plugin) - 用于静态资源转移(如设计图、开发文档等)

## 5.配置watch
按保存键,webpack自动打包
``step1:`` 
在webpack.config.js中配置
``step2:`` 
终端使用命令:webpack --watch进行打包

## 6.webpack优化黑技能
### (1)抽离第三方类库(以jquery为例)
修改入口文件->引入插件进行配置(抽离位置)

## 未完待续...


