

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var controller = require('./routes/controller');

var app = express();

// 模板开始
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// 载入中间件
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



// cookies:
//    { pgv_pvi: '2672785408',
//      'Idea-e93fbf9': '5edcba0a-02cc-4431-bfbb-f320452b735f',
//      PHPSESSID: 'g6e826p3hji7s5617auvmd8skp',
//      pgv_si: 's6500444160',
//      _csrf: 'zZ3jB7Retn1Pz_M5RJ-dfLKF' 
//      }


/**
 * ==================================================================
 */
//配置路由
/**
 * 前台
 */
app.use('/', controller.views.index);
app.use('/index', controller.views.index);
app.use('/about', controller.views.about);
var users = require('./routes/home/user');
app.post('/user', function(req, res, next){
  users(req, res, next);
});


/**
 * 后台
 */
app.use('/admin', controller.admin.index);



/**
 * ==================================================================
 */


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
