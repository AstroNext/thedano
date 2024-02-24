var express = require('express');
var {body, validationResult} = require('express-validator');
var router = express.Router();
var User = require('../models/user')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login', {});
});

router.get('/e', function(req, res, next) {
  req.session.isLoggedIn = false;
  req.session.user = [];
  return req.session.save((err) => {
    res.redirect('/');
  })
});

router.post('/', 
  body('username').isEmail().withMessage('Not a valid e-mail address'), 
  body('password').notEmpty().isLength({min : 5}).withMessage('Not a valid password'), 
  async function(req, res, next) {
  var result = validationResult(req);
  if (result.isEmpty()) {
    var {username, password } = req.body;
    var [emailIsValid, passwordIsValid, msg, user] = await User.login({ username: username, password: password});
    if (emailIsValid && passwordIsValid) {
      req.session.isLoggedIn = true;
      req.session.user = user;
      return req.session.save((err) => {
        res.locals.isLoggedIn = true;
        res.locals.user = user;
        res.redirect('/');
      })
    } else {
      res.render('login', { errormessage : msg });
    }
  } else {
    var errors = {}
    result.errors.forEach(element => {
      errors[element.path] = element.msg;
    });
    res.render('login', { errors : errors });
  }
});

module.exports = router;
