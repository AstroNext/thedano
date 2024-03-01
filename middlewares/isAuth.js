const User = require('../models/user');
const jwt = require('jsonwebtoken');

module.exports = async (req, res, next) => {
  res.locals.isAuthenticated = false;
  if (req.session.isLoggedIn) {
      res.locals.isAuthenticated = req.session.isLoggedIn ? req.session.isLoggedIn : false;
  } else {
      const token = req.cookies.thedano;
      if (token) {
        const decoded = jwt.verify(token, process.env.jwtToken);
        if (decoded.token) {
          let [isValid, user] = await User.byToken({token: decoded.token});
          if (isValid) {
            req.session.isLoggedIn = true;
            req.session.user = user;
            res.locals.isAuthenticated = true;
          }
        }
      }
  }
  next();
};