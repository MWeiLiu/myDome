

var begin=function(){
    var fs = require("fs");
    var src='/Users/qc/Desktop/qcourse/src/svg/icon/ratcharm/bi_ratcharm_00002.svg';
    // 异步读取
    fs.readFile(src, function (err, data) {
       if (err) {
           return console.error(err);
       }
//       console.log("异步读取: " + data.toString());
        end(data.toString())
    });

}

var end=function(data)}{
    var fs = require("fs");
	var src='/Users/qc/Desktop/Qtemplate.html';
	var strBegin='<!DOCTYPE html>/n<html><body>';
	var strEnd='</body></html>'
	var Data=strBegin+data+strEnd;
    console.log("准备写入文件");
    fs.writeFile(src, Data,  function(err) {
       if (err) {
           return console.error(err);
       }
       console.log("数据写入成功！");
    });
}