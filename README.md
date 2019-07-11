# webpack
## webpack4+ studying

## 起步
### 目录结构
```
webpack4_demo
|-dist
 |-index.html
|-src
 |-index.js
|-package.json
```

### 安装导入lodash, 处理数组对象等
运行demo
```
webpack4_demo
|-dist
 |-index.html
 |-bundle.js
|-src
 |-index.js
|-package.json
```

### webpack配置文件
webpack.config.js
在配置npm script之前可以使用`npx webpack`运行打包程序, 而不需要全局安装`webpack-cli`, 配置npm script之后, 则可以像`npx`一样运行脚本
`"build": webpack`
```
webpack4_demo
|-dist
 |-index.html
 |-bundle.js
|-src
 |-index.js
|-webpack.config.js
|-package.json
```

## 管理资源
在 webpack 出现之前，前端开发人员会使用 grunt 和 gulp 等工具来处理资源，并将它们从 /src 文件夹移动到 /dist 或 /build 目录中。同样方式也被用于 JavaScript 模块，但是，像 webpack 这样的工具，将动态打包(dynamically bundle)所有依赖项（创建所谓的依赖图(dependency graph)）。这是极好的创举，因为现在每个模块都可以明确表述它自身的依赖，我们将避免打包未使用的模块。

webpack 最出色的功能之一就是，除了 JavaScript，还可以通过 loader 引入任何其他类型的文件。也就是说，以上列出的那些 JavaScript 的优点（例如显式依赖），同样可以用来构建网站或 web 应用程序中的所有非 JavaScript 内容。

### 配置css
`npm install --save-dev style-loader css-loader`
```javascript
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
  }
```
当该模块运行时，含有 CSS 字符串的 `<style>` 标签，将被插入到 html 文件的 `<head>`中

### 加载图片
`npm install file-loader --save-dev`
无论是在js中import导入图片，还是在css中加载背景图片，亦或是在html中src引入图片，`file--loader`都能将图像处理，打包到`output`目录，得到一个最终url，并将本地开发的图片路径替换为`output`目录的最终url

### 加载字体
与上同理，通过配置好 loader 并将字体文件放在合适的地方，可以通过一个 @font-face 声明引入。本地的 url(...) 指令会被 webpack 获取处理，就像它处理图片资源一样


## 管理输出
### 多入口
```javascript
entry: {
    app: './src/index.js',
    print: './src/print.js'
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
```

### 管理多入口
如果有多个入口，则会打包生成多个`*.bundle.js`文件，为了动态将打包生成的bundle文件添加到打包的index.html，可以使用`HtmlWebpackPlugin`，使用此插件后将会重新打包index.html文件，并将所有生成bundle文件添加到多个script标签中
`npm install --save-dev html-webpack-plugin`
```javascript
const HtmlWebpackPlugin = require('html-webpack-plugin')
...
plugins: [
  new HtmlWebpackPlugin({
    title: 'Output Management'
  })
]
```
若想了解更多请看官方文档  [html-webpack-plugin仓库](https://github.com/jantimon/html-webpack-plugin 'title')

额外功能可查看` html-webpack-template`

### 清理`/dist`文件夹
每次构建前清理`/dist`文件夹，只生成会用到的文件
`npm install clean-webpack-plugin --save-dev`
```javascript
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
...
plugins: [
  ...,
  new CleanWebpackPlugin()
]
```
### Manifest
通过 manifest，webpack 能够对「你的模块映射到输出 bundle 的过程」保持追踪。
通过使用 WebpackManifestPlugin，可以直接将数据提取到一个 json 文件，以供使用。
后续需要了解......


## 开发指南
建立开发环境
> 本指南中的工具仅用于**开发环境**，请**不要**在生产环境中使用它们！

### 使用source map
当 webpack 打包源代码时，可能会很难追踪到错误和警告在源代码中的原始位置。为了更容易地追踪错误和警告，JavaScript 提供了 `source map` 功能，将编译后的代码映射回原始源代码  
`devTool`选项用以控制是否生成以及如何生成source map  
详情查看[devTool](https://www.webpackjs.com/configuration/devtool/ 'title')
`devtool: 'inline-source-map',`


### 选一个开发工具
每次要编译代码时，手动运行 `npm run build` 就会变得很麻烦。  
webpack 中有几个不同的选项，可以帮助你在代码发生变化后自动编译代码：
1. webpack's Watch Mode
2. webpack-dev-server
3. webpack-dev-middleware

#### 使用观察模式
在packgage.json中配置npm script脚本，观察所有文件，若文件发生改变则自动构建。启动后不会退出命令行，script脚本继续观察文件。  
缺点是：在重新构建后我们需要刷新浏览器才能看到变化

#### 使用 webpack-dev-server
`npm install webpack-dev-server --save-dev`  
修改配置文件，告诉开发服务器(dev server)，在哪里查找文件：
```javascript
"dev-server": {
  contentBase: './dist'
}
```
以上配置告诉`webpack-dev-server`，在`localhost:8080`下建立服务，将`dist`目录下的文件作为可访问文件  
添加脚本，可以直接运行开发服务器(dev server):
`"server": "webpack-dev-server --open"`  
[webpack-dev-server相关文档](https://www.webpackjs.com/configuration/dev-server/)
> 上述配置后，运行devServer后，每次更新打包文件会刷新浏览器，为了不进行完全刷新可以使用**模块热替换**(HMR: Hot Module Repalcement)  
> HMR 同样不适用于生产环境  

后续详述HMR  

#### 使用 webpack-dev-middleware
`webpack-dev-middleware` 是一个容器(wrapper)，它可以把 webpack 处理后的文件传递给一个服务器(server)。 `webpack-dev-server` 在内部使用了它，同时，它也可以作为一个单独的包来使用，以便进行更多自定义设置来实现更多的需求（可与experss server一同使用）。
[webpack-dev-middleware使用范例](https://www.webpackjs.com/guides/development/#%E4%BD%BF%E7%94%A8-webpack-dev-middleware)


## 模块热替换HMR
### 启用HMR
模块热替换(Hot Module Replacement 或 HMR)是 webpack 提供的最有用的功能之一。它允许在运行时更新各种模块，而无需进行完全刷新。
> HMR 不适用于生产环境，这意味着它应当只在开发环境使用
启用此功能实际上相当简单。而我们要做的，就是更新 webpack-dev-server 的配置，和使用 webpack 内置的 HMR 插件
```javascript
...
const webpack = require('webpack')
...
plugins: [
  ...
  new webpack.NamedModulesPlugin,
  new webpack.HotModuleReplacementPlugin
],
devServer: {
  ...,
  hot: true
},
```
> 你可以通过命令来修改 webpack-dev-server 的配置：`webpack-dev-server --hotOnly`

修改 index.js 文件，以便当 print.js 内部发生变更时可以告诉 webpack 接受更新的模块  
```javascript
if (module.hot) {
  module.hot.accept('./print.js', function() {
    console.log('Accepting the updated printMe module!')
  })
}
```

### 通过Node.js API
当使用 webpack dev server 和 Node.js API 时，不要将 dev server 选项放在 webpack 配置对象(webpack config object)中。而是，在创建选项时，将其作为第二个参数传递。  
`new WebpackDevServer(compiler, options)`  
想要启用 HMR，还需要修改 webpack 配置对象，使其包含 HMR 入口起点。webpack-dev-server package 中具有一个叫做 `addDevServerEntrypoints` 的方法，你可以通过使用这个方法来实现
```javascript
const webpackDevServer = require('webpack-dev-server');
const webpack = require('webpack');

const config = require('./webpack.config.js');
const options = {
  contentBase: './dist',
  hot: true,
  host: 'localhost'
};

webpackDevServer.addDevServerEntrypoints(config, options);
const compiler = webpack(config);
const server = new webpackDevServer(compiler, options);

server.listen(5000, 'localhost', () => {
  console.log('dev server listening on port 5000');
});
```

### 问题
如果你继续点击示例页面上的按钮，你会发现控制台仍在打印这旧的 `printMe` 功能。这是因为按钮的 `onclick` 事件仍然绑定在旧的 `printMe` 函数上。  
为了让它与 HMR 正常工作，我们需要使用 `module.hot.accept` 更新绑定到新的 printMe 函数上
修改index.js文件：
```javascript
// document.body.appendChild(component())
let element = component()
document.body.appendChild(element)
// 热更新
if (module.hot) {
  module.hot.accept('./print.js', function() {
    console.log('Accepting the updated printMe module!')
    document.body.removeChild(element)
    element = component()
    document.body.appendChild(element)
  })
}
```
当然，这样操作不是最优解，存在很多 loader，使得模块热替换的过程变得更容易。

### HMR 修改样式表
借助于 `style-loader` 的帮助，CSS 的模块热替换实际上是相当简单的。当更新 CSS 依赖模块时，此 loader 在后台使用 `module.hot.accept` 来修补(patch) `<style>` 标签
直接使用`style-loader` `css-loader`就可实现css热更新
