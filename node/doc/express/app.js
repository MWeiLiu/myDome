//加载express模块
var express = require('express');
var createError = require('http-errors');

//路径模块
var path = require('path');

//解析cookie工具，res.cookie获取cookie
var cookieParser = require('cookie-parser');

//在控制台中显示req请求的信息
var morgan = require('morgan');

var controller = require('./routes/controller');
var session = require('express-session');
var ejs = require('ejs');

var fs = require('fs');

//日志分割
var FileStreamRotator = require('file-stream-rotator')

var app = express();

// 模板开始
//指定渲染模板的路径
app.set('views', path.join(__dirname, 'views'));

//指定渲染模板的后缀
// app.set('view engine', 'jade');

app.engine('html', ejs.__express);
app.set('view engine', 'html');


// 载入中间件

//创建一个写文件流，并且保存在当前文件夹的access.log文件中
// var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), {
//   flag: 'a'
// });
//记录http通信操作日志，dev/combined/tiny/short格式
// format：日志格式，本质是代表日志格式的字符串，比如 :method :url :status :res[content-length] - :response-time ms。
// token：format的组成部分，比如上面的:method、:url即使所谓的token。
// morgan.format(name, format);  // 自定义日志格式
// morgan.token(name, fn);  // 自定义token

//设置日志文件目录
var logDirectory = path.join(__dirname, 'log')

//确保日志文件目录存在 没有则创建
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory)

//创建一个写路由
var accessLogStream = FileStreamRotator.getStream({
  date_format: 'YYYYMMDD',
  filename: path.join(logDirectory, 'access-%DATE%.log'),
  frequency: 'daily',
  verbose: false
});

//写入日志文件
// morgan(':method :url :status :res[content-length] - :response-time ms')

//tiny
// app.use(morgan(':method :url :status :res[content-length] - :response-time ms', {
//   stream: accessLogStream
// }));
app.use(morgan('tiny', {
  stream: accessLogStream
}));

app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());

//设置静态资源
app.use(express.static(path.join(__dirname, 'public')));


app.all('*', function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By", ' 3.2.1')
  if (req.method == "OPTIONS") res.send(200); /*让options请求快速返回*/
  else next();
});


//生成一个session实例
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
}))



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

app.post('/user', (req, res, next) => {
  require('./routes/home/user')(req, res, next);
});

var cheerio = require('cheerio'),
  http = require('http'),
  Code = require('./config/Code'),
  Msg = require('./config/helpres')
app.get('/gethtml', (req, Res, next) => {
  var params = req.query;
  // http.get(params.url1, (res) => {
  //   var html = '';
  //   res.on('data', (data) => {
  //     html += data;
  //   });
  //   res.on('end', () => {

  //     //使用load方法，参数是刚才获取的html源代码数据
  //     var $ = cheerio.load(html);
  //     var arrUrl = [];

  //     $('div').each(function (index, element) {
  //       if ($(element).attr('id') == 'newsContent01') {
  //         arrUrl.push($(element).html());
  //       }
  //     });

  //     return Res.json(Msg('110000', Code.public['110000'], arrUrl))
  //   });

  // }).on('error', () => {
  //   return Res.json(Msg('110001', Code.public['110001']))
  // });

  // var count = 0;
  // var results = [];

  // function done() {
  //   if (count == arrUrl.length) {
  //     console.log('done');
  //     return Res.json(Msg('110000', Code.public['110000'], arrUrl))
  //   }
  // }
  // arrUrl.forEach(function (item, index) {
  //   http.get(item, function (res) {
  //     var html = '';
  //     res.on('data', function (data) {
  //       html += data;
  //     });

  //     res.on('end', function () {
  //       var $ = cheerio.load(html);
  //       var title = $('.entry-title').text();

  //       results[index] = {
  //         url: item,
  //         title: title
  //       };
  //       count++;
  //       done();
  //     });
  //   });
  // });

});

/**
 * 后台
 */
app.use('/admin', controller.admin.index);



/**
 * ==================================================================
 */


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error.jade');
});

module.exports = app;