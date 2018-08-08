var express = require('express');
var app = express();
// var host = 'http://47.104.213.34';
app.listen(8080);
console.log('Server listening on 8080');

// var dirname = '/data/wwwroot/default/node';

var BaseResult = require('/doc/dome/practiceDome/node/doc/node_2/text.js');
// var BaseResult = require(dirname + '/text.js');

BaseResult.SUCCESS.setData({a:10,b:[{c:20,d:30},{e:40,f:50}]});

app.get('/',function(req,res){
    console.log("请求url：",req.path);
    console.log("请求参数：",req.query);
    res.send(BaseResult.SUCCESS);
});

//BaseResult.USER_PASSWORD_ERROR.setData();
app.get('/user',function(req,res){
    res.send(BaseResult.USER_PASSWORD_ERROR);
});