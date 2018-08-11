var express = require('express');
var router = express.Router();
var config = require('../../config/config');

/* GET home page. */
router.get('/', function(req, res, next) {
	res.set('Content-Type', 'text/html');
	res.sendFile(config._dirName + 'views/view/index.html');
  // res.render('express', { title: 'Express' });
});


module.exports = router;
