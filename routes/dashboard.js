var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/dashboard', async function(req, res, next) {
    res.render('dashboard', {});
});

router.get('/dashboard/addresses', async function(req, res, next) {
    res.render('addresses', {});
});

router.get('/dashboard/orders', async function(req, res, next) {
    res.render('orders', {});
});

router.get('/dashboard/setting', async function(req, res, next) {
    res.render('setting', {});
});

router.get('/dashboard/cart', async function(req, res, next) {
    res.render('cart', {});
});

router.get('/dashboard/wishlist', async function(req, res, next) {
    res.render('wishlist', {});
});

module.exports = router;