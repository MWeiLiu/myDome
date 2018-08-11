var express = require('express');
var router = express.Router();
var config = require('../../config/config');

router.get('/', function(req, res, next) {
	res.set('Content-Type', 'text/html');
	res.sendFile(config._dirName + 'views/view/about.html');
});

module.exports = router;