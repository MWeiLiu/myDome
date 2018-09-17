// var express = require('express');
// var router = express.Router();
// var User = require('../../mysql/Model/User/User');


// router.get('/', function(req, res, next) {
//   var user = new User;
//   var send = user.getOne(req.query);
//   // console.log(req.query)
//   console.log(send)
//   res.send(send);
// });

// module.exports = router;



function user(req, res, next) {
  var express = require('express'),
    router = express.Router(),
    URL = require('url'),
    mysql = require('mysql'),
    Msg = require('../../config/helpres'),
    Code = require('../../config/Code'),
    //创建链接
    connection = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'root',
      database: 'express'
    });

  // console.log('req')
  // console.log(req.body)
  var params = req.body

  //执行创建链接
  connection.connect();
  //SQL语句
  var sql = 'SELECT * FROM User';
  var addSql = 'INSERT INTO User(username,password) VALUES(?,?)';

  //解析请求参数
  // var params = URL.parse(req.url, true).query;
  var addSqlParams = [params.username, params.password];
  console.log(addSqlParams)

  // //增
  // connection.query(addSql, addSqlParams, function (err, result) {
  //   console.log('1')
  //   if (err) {
  //     console.log('2')
  //     console.log('[INSERT ERROR] - ', err.message);
  //     return;
  //   }
  //   console.log('3')
  // });

  //查
  connection.query(sql, function (err, result) {
    if (err) {
      console.log('[SELECT ERROR] - ', err.message);
      return;
    }
    console.log(result);

    //把搜索值输出
    // res.send(result);
    // var info = {};
    // for(var i in result[0]){
    //   info[i] = result[0][i];
    // }
    res.header("Content-Type", "application/json; charset=utf-8");
    res.json(Msg('110000', Code.public['110000'], result));
  });
}

module.exports = user;