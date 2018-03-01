var fs = require("fs");

//fs.readFile()是异步函数用于读取文件，如果在读取文件中发生错误，err对象就会输出错误信息
//否则文件就会通过回调函数输出
fs.readFile('input.txt', function (err, data) {
   if (err){
      console.log(err.stack);//Error: ENOENT, open 'input.txt'
      return;
   }
   console.log(data.toString());
});
console.log("程序执行完毕");