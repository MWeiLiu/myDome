var express = require('express');
var app = express();
app.listen(8888);
console.log('Server listening on 8888');

var BaseResult = require('/doc/dome/practiceDome/node/doc/node_2/text.js');

BaseResult.SUCCESS.setData({a:10,b:[{c:20,d:30},{e:40,f:50}]});
app.get('/',function(req,res){
    res.send(BaseResult.SUCCESS);
});


//BaseResult.USER_PASSWORD_ERROR.setData();
app.get('/user',function(req,res){
    res.send(BaseResult.USER_PASSWORD_ERROR);
})