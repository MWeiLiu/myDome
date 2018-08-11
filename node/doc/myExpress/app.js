
var express = require('express');
var BaseResult = require('/doc/dome/practiceDome/node/doc/myexpress/public/js/text.js');
var app = express();
app.set('view engine', 'jade');
// var BaseResult = require(dirname + '/text.js');

BaseResult.SUCCESS.setData({a:10,b:[{c:20,d:30},{e:40,f:50}]});

// 对网站首页的访问返回 "Hello World!" 字样
app.get('/index', function (req, res) {
    res.send(BaseResult.SUCCESS);
});

app.get('/indexJade', function (req, res, next) {
    res.render('index', {title: 'Hey', message: 'hello there!'});
    next();
});
  
  // 网站首页接受 POST 请求
app.post('/', function (req, res) {
    
    // res.send('Got a POST request');
    res.send(req.query);
});

  // /user 节点接受 PUT 请求
app.get('/user', function (req, res) {
    res.send(BaseResult.USER_PASSWORD_ERROR);
});
  
app.route('/book')
  .get(function(req, res) {
    res.send('Get a random book');
  })
  .post(function(req, res) {
    res.send('Add a book');
  })
  .put(function(req, res) {
    res.send('Update the book');
  });
  
  // /user 节点接受 DELETE 请求
app.delete('/user', function (req, res) {
    res.send('Got a DELETE request at /user');
});

//访问静态文件
// app.use(express.static('public'));
app.use('/', express.static('public'));

var server = app.listen(4000, function(){
    var host = server.address().address;
    var port = server.address().port;
    console.log('Example app listening at http://%s:%s', host, port);
});