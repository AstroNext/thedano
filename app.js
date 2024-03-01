require('dotenv').config();
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');

var authMiddleware = require('./middlewares/isAuth');

var indexRouter = require('./routes/home');
var productRouter = require('./routes/product');
var dashboardRouter = require('./routes/dashboard');
var loginRouter = require('./routes/login');
var adminRouter = require('./routes/admin');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('rootLayout', 'index');
app.set('view engine', 'ejs');

// page configration
app.set('home', { render: '../views/pages/home', title: 'Home'});
app.set('product', { render: '../views/pages/product', title: 'Product'});
app.set('dashboard', { render: '../views/pages/dashboard', interface: '../interfaces/main', title: 'Dashboard - Main'});
app.set('addresses', { render: '../views/pages/dashboard', interface: '../interfaces/Addresses', title: 'Dashboard - Addresses'});
app.set('orders', { render: '../views/pages/dashboard', interface: '../interfaces/orders', title: 'Dashboard - Orders'});
app.set('cart', { render: '../views/pages/dashboard', interface: '../interfaces/carts', title: 'Dashboard - Cart'});
app.set('wishlist', { render: '../views/pages/dashboard', interface: '../interfaces/wishlist', title: 'Dashboard - Wishlist'});
app.set('setting', { render: '../views/pages/dashboard', interface: '../interfaces/setting', title: 'Dashboard - Setting'});
app.set('login', { render: '../views/pages/login', title: 'Login'});
app.set('signup', { render: '../views/pages/signup', title: 'Sign up'});
app.set('admin', { render: '../views/pages/admin', title: 'Admin'});
app.set('5xx', { render: '../views/errors/5xx', title: 'Error'});
app.set('404', { render: '../views/errors/404', title: 'Error'});

app.use(require('./middlewares/pages'));

app.use(session({secret : 'thedano', resave: true, saveUninitialized: true}));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(authMiddleware.Authorization);

app.use(indexRouter);
app.use(productRouter);
app.use(dashboardRouter);
app.use(loginRouter);
app.use(adminRouter);

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
