var express = require('express');
var router = express.Router();
var config = require('../../config/config');
var csurf = require('csurf');
//设置路由中间件
var csrfProtection = csurf();
router.use(csrfProtection);

/* GET home page. */
router.get('/', function (req, res, next) {
	res.set('Content-Type', 'text/html');
	// res.sendFile(config._dirName + 'views/view/index.html');
	res.render('index', {
		_token: req.csrfToken(),
		title: 'index'
	});
});


module.exports = router;