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


// var options = {
//   from      : '"你的名字" <你的邮箱地址>',
//   to       : '"用户1" <邮箱地址1>, "用户2" <邮箱地址2>',
//   // cc     : ''  //抄送
//   // bcc     : ''  //密送
//   subject    : '一封来自Node Mailer的邮件',
//   text      : '一封来自Node Mailer的邮件',
//   html      : '<h1>你好，这是一封来自NodeMailer的邮件！</h1><p><img src="cid:00000001"/></p>',
//   attachments  : 
//         [
//           {
//             filename: 'img1.png',      // 改成你的附件名
//             path: 'public/images/img1.png', // 改成你的附件路径
//             cid : '00000001'         // cid可被邮件使用
//           },
//           {
//             filename: 'img2.png',      // 改成你的附件名
//             path: 'public/images/img2.png', // 改成你的附件路径
//             cid : '00000002'         // cid可被邮件使用
//           },
//         ]
// };

// mailTransport.sendMail(options, function(err, msg){
//   if(err){
//     console.log(err);
//     res.render('index', { title: err });
//   }
//   else {
//     console.log(msg);
//     res.render('index', { title: "已接收："+msg.accepted});
//   }
// });


// function mail(mailTransport, res) {
//   console.log(res)
//   var options = {
//     from: '872496024@qq.com',
//     to: '1161679264@qq.com',
//     // cc     : ''  //抄送
//     // bcc     : ''  //密送
//     subject: '一封来自Node Mailer的邮件',
//     text: '一封来自Node Mailer的邮件',
//     html: '<h1>你好，这是一封来自NodeMailer的邮件！</h1><p><img src="cid:00000001"/></p>',
//     attachments: [{
//         filename: 'bd_logo1.png', // 改成你的附件名
//         path: 'https://www.baidu.com/img/bd_logo1.png?where=super', // 改成你的附件路径
//         cid: '00000001' // cid可被邮件使用
//       },
//       // {
//       //   filename: 'img2.png', // 改成你的附件名
//       //   path: 'public/images/img2.png', // 改成你的附件路径
//       //   cid: '00000002' // cid可被邮件使用
//       // },
//     ]
//   };

//   mailTransport.sendMail(options, function (err, msg) {
//     if (err) {
//       console.log(err);
//       res.render('user', {
//         title: err
//       });
//     } else {
//       console.log(msg);
//       res.render('user', {
//         title: "已接收：" + msg.accepted
//       });
//     }
//   });
// }


function user(req, res, next) {
  var express = require('express'),
    router = express.Router(),
    URL = require('url'),
    mysql = require('mysql'),
    Msg = require('../../config/helpres'),
    Code = require('../../config/Code'),
    multer = require('nodemailer'),
    //创建链接
    connection = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'root',
      database: 'express'
    }),
    mailTransport = multer.createTransport({
      host: 'smtp.qq.com',
      secureConnection: true, // 使用SSL方式（安全方式，防止被窃取信息）
      auth: {
        user: '872496024@qq.com',
        pass: 'waddkdirarvhbcej'
      },
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



    //发邮件√
    // var options = {
    //   from: '872496024@qq.com',
    //   to: '1161679264@qq.com',
    //   // cc     : ''  //抄送
    //   // bcc     : ''  //密送
    //   subject: '一封来自Node Mailer的邮件',
    //   text: '一封来自Node Mailer的邮件',
    //   html: '<h1>你好，这是一封来自NodeMailer的邮件！</h1><p><img src="cid:00000001"/></p>',
    //   attachments: [{
    //       filename: 'bd_logo1.png', // 改成你的附件名
    //       path: 'https://www.baidu.com/img/bd_logo1.png?where=super', // 改成你的附件路径
    //       cid: '00000001' // cid可被邮件使用
    //     },
    //     // {
    //     //   filename: 'img2.png', // 改成你的附件名
    //     //   path: 'public/images/img2.png', // 改成你的附件路径
    //     //   cid: '00000002' // cid可被邮件使用
    //     // },
    //   ]
    // };

    // mailTransport.sendMail(options, function (err, msg) {
    //   if (err) {
    //     console.log(err);
    //     res.render('user', {
    //       title: err
    //     });
    //   } else {
    //     console.log(msg);
    //     res.render('user', {
    //       title: "已接收：" + msg.accepted
    //     });
    //   }
    // });


    //发短信×
    // var Sms = require('../../config/sms');
    // var sms = new Sms();
    // sms.send(req, res);

    res.header("Content-Type", "application/json; charset=utf-8");
    return res.json(Msg('110000', Code.public['110000'], Array()));
  });
}

module.exports = user;