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
