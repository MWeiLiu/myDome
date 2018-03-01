//发布

var begin=function(){
    var fs = require("fs");
    var url='/Users/qc/Desktop/空灵触动/index.html';
    // 异步读取
    fs.readFile(url, function (err, data) {
       if (err) {
           return console.error(err);
       }
//       console.log("异步读取: " + data.toString());
        end(data.toString())
    });

}

var end=function(data){
    var fs = require("fs");
	var src='/usr/local/Cellar/nginx/1.12.0_1/html/index.html';
    console.log("准备写入文件");
    fs.writeFile(src, data,  function(err) {
       if (err) {
           return console.error(err);
       }
       console.log("数据写入成功！");
    });
}

begin()
