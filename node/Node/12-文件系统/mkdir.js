//创建目录
//语法
//
//以下为创建目录的语法格式：
//
//fs.mkdir(path[, mode], callback)
//
//参数
//
//参数使用说明如下：
//
//  path - 文件路径。
//
//  mode - 设置目录权限，默认为 0777。
//
//  callback - 回调函数，没有参数。


var fs = require("fs");
var url='/usr/local/Cellar/nginx/1.12.0_1/html/data/';
console.log("创建目录 /tmp/test/");
fs.mkdir(url,function(err){
   if (err) {
       return console.error(err);
   }
   console.log("目录创建成功。");
});