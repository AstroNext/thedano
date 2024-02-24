var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  // console.log(req.session)
  // console.log("-----------------------------------------------------------------")
  // console.log(res.locals)
  res.render('home', { });
});

module.exports = router;
