var express = require('express');
var router = express.Router();
var User = require('../../mysql/Model/User/User');

/* GET users listing. */
router.get('/', function(req, res, next) {
  var user = new User;
  var send = user.getOne(req.query);
  // console.log(req.query)
  console.log(send)
  res.send(send);
});

module.exports = router;
