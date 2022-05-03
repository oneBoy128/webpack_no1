# webpack_no1
一个简要的webpack打包的基本代码
### 安装所需包
```
npm webpack -D
npm webpack-cli -D
npm webpack-dev-server -D
npm css-loader -D
npm html-loader -D
npm html-webpack-plugin -D
npm mini-css-extract-plugin -D
npm path -D
```

### 解析模块
#### 所需导入的包
```
const Path = require('path');//后继文件路径所需
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
```

#### 入口模块
```
entry:['一个JS模板的入口','一个html模块的入口']
```
这仅仅是为了能够实现devServer实现html的热更新做的处理

#### 出口模块
```
output:{
    path: Path.resolve(__dirname,'取一个打包后的文件夹名字'),
    filename: '为JS取一个路径名 比如:js/build.js'//表示build/js/build.js
}
```

#### loader模块
所需使用loader的文件:  html文件, css文件
所需使用内置模块资源的文件 : 图片文件, 字体图标文件
```
module:{
    rules:[
          {
                test:/\.css$/,
                use:[MiniCssExtractPlugin.loader,'css-loader']
            },
            {
                test:/\.(jpg|gif|png)$/,
                type:'asset',
                parser:{
                    dataUrlCondition:{
                        maxSize:1024
                    }
                },
                generator:{
                    filename:'img/[name].[hash:6].[ext]'
                }
            },
            {
                test:/\.(woff|woff2|ttf)$/,
                type:'asset',
                generator:{
                    filename:'font/[name].[hash:6].[ext]'
                }
            },
            {
                test:/\.html$/,
                use:['html-loader']
            }
    ]
}
```

#### 插件
目前只使用了html-webpack-plugin和mini-css-extract-plugin
```
plugins:[
    new MiniCssExtractPlugin({
            filename:'打包后css存放的路径和文件名 比如css/build.css'
        }),
        new HtmlWebpackPlugin({
            template:'指定的打包前的html模板 比如./src/app.html',
            filename:'打包后html存放的路径和文件名 比如build.html'
        })
]
```

#### mode
只有production和development两个模式

#### devServer
终端热更新必写指令
```
npx webpack-dev-server
```

热更新必写代码
```
devServer:{
    static:{
        directory:Path.join(__dirname,'打包后的文件夹名')
    },
    open:true,//初次热更新后自动打开
    port:3000,//制定端口
    hot:true//确认热更新
}
```

#### 消除警告代码
一般热更新后html文件出现警告，在Webpack中输入代码即可
```
  performance: {
        hints: "warning", 
        maxAssetSize: 300000, 
        maxEntrypointSize: 500000, 
        assetFilter: function (assetFilename) {
            return assetFilename.endsWith('.css') || assetFilename.endsWith('.js');
        }
    }
```

#### 必做前置
```
//在主JS文件中
import '主css文件'

//在主css文件中
@import '字体图标文件'
```
