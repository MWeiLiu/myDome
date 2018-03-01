var fs = require('fs');
var path = '/Users/qc/Desktop/qcourse/src/svg/icon/ratcharm',name = 'bi_ratcharm_0000';
for (var i=0;i<20;i++ ) {
    var number = i;
    var pathStr = path + '/' + name + number.toString();
    fs.mkdirSync(pathStr,0777);
    var newPathStr = pathStr + '/' + name + number.toString() + '.txt';
    fs.mkdirSync(newPathStr,0777);
}
'/Users/qc/Desktop/node教程/实例/测试'
