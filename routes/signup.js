var express = require('express');
const {validationResult, body} = require('express-validator');
const User = require('../models/user');
var router = express.Router();

/* GET home page. */
router.get('/signup', function(req, res, next) {
  res.render('signup', {});
});

router.post('/signup', 
  body('username').isEmail().withMessage('Not a valid e-mail address'), 
  body('password').notEmpty().isLength({min : 5}).withMessage('Not a valid password'),
  body('repassword').custom((value, {req}) => { return value === req.body.password; }).withMessage('Not match with password'), 
  async function(req, res, next) {
    var result = validationResult(req);
    if (result.isEmpty()) {
      const {username, password} = req.body;
      let user = await User.add({inputEmail: username, inputPhonenumber : '1234', inputPassword: password});
      if (user) {
        res.render('login', {});
      }
      else {
        res.render('home', {});
      }
    } else {
      var errors = {}
      result.errors.forEach(element => {
        errors[element.path] = element.msg;
      });
      res.render('signup', { errors : errors });
    }
})

module.exports = router;
