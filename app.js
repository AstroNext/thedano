require('dotenv').config();
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');

var indexRouter = require('./routes/home');
var productRouter = require('./routes/product');
var loginRouter = require('./routes/login');
var signupRouter = require('./routes/signup');
var adminRouter = require('./routes/admin');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('rootLayout', 'index');
app.set('view engine', 'ejs');


// page configration
app.set('home', { render: '../views/pages/home', title: 'Home'});
app.set('product', { render: '../views/pages/product', title: 'Product'});
app.set('login', { render: '../views/pages/login', title: 'Login'});
app.set('signup', { render: '../views/pages/signup', title: 'Sign up'});
app.set('admin', { render: '../views/pages/admin', title: 'Admin'});
app.set('5xx', { render: '../views/errors/5xx', title: 'Error'});
app.set('404', { render: '../views/errors/404', title: 'Error'});

app.use(require('./middlewares/pages'));
// app.use(require('./middlewares/isLogged'));

app.use(session({secret : 'thedano', resave: true, saveUninitialized: true}));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/home', indexRouter);
app.use('/product', productRouter);
app.use('/login', loginRouter);
app.use('/signup', signupRouter);
app.use('/admin', adminRouter);
app.use('/users', usersRouter);

app.use((req, res, next) => {
  // locals allows to access variables inside views
  res.locals.isAuthenticated = req.session.isLoggedIn ? req.session.isLoggedIn : false;
  console.log(res.locals.isAuthenticated, req.session.isLoggedIn)
  // res.locals.csrfToken = req.csrfToken();
  next();
});

// catch 404 and forward to error handler
app.use(function(req, res, next){
  res.status(404).render('404', { url: req.originalUrl});
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('5xx', {});
});

module.exports = app;
