var express = require('express');
var {body, validationResult} = require('express-validator');
var router = express.Router();
var User = require('../models/user')
var jwt = require('jsonwebtoken');

/* GET home page. */
router.get('/login', function(req, res, next) {
  res.render('login', {});
});

router.get('/logout', function(req, res, next) {
  req.session.destroy((err) => {
    if (err) {
      return console.log(err);
    }
    res.clearCookie('thedano').redirect('/');
  })
});

router.post('/logout', function(req, res, next) {
  req.session.destroy((err) => {
    if (err) {
      return console.log(err);
    }
    res.clearCookie('thedano').redirect('/');
  })
});

router.post('/login', 
  body('username').isEmail().withMessage('Not a valid e-mail address'), 
  body('password').notEmpty().isLength({min : 5}).withMessage('Not a valid password'), 
  async function(req, res, next) {
  var result = validationResult(req);
  if (result.isEmpty()) {
    var { username, password, remember } = req.body;
    var [ emailIsValid, passwordIsValid, msg, user ] = await User.login({ username: username, password: password});
    if (emailIsValid && passwordIsValid) {
      req.session.isLoggedIn = true;
      req.session.user = user;
      return req.session.save(async (err) => {
        if (remember) {
          let [isGenerated, generatedToken] = await User.generateToken({ email: user.email });
          if (isGenerated) {
            let token = jwt.sign({token: generatedToken}, process.env.JWTTOKEN);
            res.cookie('thedano', token, {httpOnly: true});
          }
        }
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
