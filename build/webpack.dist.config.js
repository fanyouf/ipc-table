const path = require('path');
const merge = require('webpack-merge');
const webpackBaseConfig = require('./webpack.base.config.js');

let setting =  merge(webpackBaseConfig, {
  // devtool: '#source-map',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/dist/',
    filename: 'ipc-table.js', // 我们可不想打包后叫build.js 多low啊 起一个与项目相对应的
    library: 'ipc-table', // library指定的就是你使用require时的模块名，这里便是require("ipc-table")
    libraryTarget: 'umd', //libraryTarget会生成不同umd的代码,可以只是commonjs标准的，也可以是指amd标准的，也可以只是通过script标签引入的。
    umdNamedDefine: true // 会对 UMD 的构建过程中的 AMD 模块进行命名。否则就使用匿名的 define。
  },
  externals:{
    vue:"vue",
    iview:"iview",
    xlsx:'xlsx',
    'element-ui': 'ElementUI'
  }
});

console.info(setting)
module.exports = setting;
