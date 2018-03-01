//删除文件
//语法
//
//以下为删除文件的语法格式：
//
//fs.unlink(path, callback)
//
//参数
//
//参数使用说明如下：
//
//  path - 文件路径。
//
//  callback - 回调函数，没有参数。


var fs = require("fs");
var url='/usr/local/Cellar/nginx/1.12.0_1/html/ml.txt'
console.log("准备删除文件！");
fs.unlink(url, function(err) {
   if (err) {
       return console.error(err);
   }
   console.log("文件删除成功！");
});