const Path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

//webpack有入口，出口，loader, 插件, 模式, 热更新板块, 消除警告板块
module.exports = {
    //为了后继完成热更新，现在需要添加html为另一个入口
    entry:['./src/index.html','./src/index.js'],
    output:{
        path: Path.resolve(__dirname,'build'),
        filename: 'js/build.js',
        clean:true
    },
    module:{
        rules:[
            {
                //加载css用普通的loader进行打包即可
                test:/\.css$/,
                use:[MiniCssExtractPlugin.loader,'css-loader']
            },
            {
                //加载图片用内置模块资源
                test:/\.(jpg|gif|png)$/,
                type:'asset',
                parser:{
                    dataUrlCondition:{
                        maxSize:1024
                    }
                },
                generator:{//内置模块资源设置文件信息
                    filename:'img/[name].[hash:6].[ext]'
                }
            },
            {  
                //加载字体图标用内置模块资源
                test:/\.(woff|woff2|ttf)$/,
                type:'asset',
                generator:{
                    filename:'font/[name].[hash:6].[ext]'
                }
            },
            {
                //加载html资源用普通的即可
                test:/\.html$/,
                use:['html-loader']
            }
        ]
    },
    //插件plugins数组
    plugins:[
        //设置html资源的插件
        new HtmlWebpackPlugin({
            //模板与打包后的文件名
            template:'./src/index.html',
            filename:'build.html'
        }),
        //设置css资源的插件
        new MiniCssExtractPlugin({
            //文件名
            filename:'css/build.css'
        })
    ],
    mode:'development',
    //设置热更新
    devServer:{
        static:{//设置模拟热更新空内存
            directory:Path.join(__dirname,'build')
        },
        port:3000,//设置端口号
        hot:true,//设置HMR启动
        open:true,//设置更新好后打开
    },
    //消除警告
    performance: {
        hints: "warning", 
        maxAssetSize: 300000, 
        maxEntrypointSize: 500000, 
        assetFilter: function (assetFilename) {
            return assetFilename.endsWith('.css') || assetFilename.endsWith('.js');
        }
    }
}