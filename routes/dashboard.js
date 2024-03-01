var express = require('express');
var router = express.Router();
var auth = require('../middlewares/isAuth');
var User = require('../models/user');
var Address = require('../models/address');

/* GET users listing. */
router.get('/dashboard', auth.Authentication, async function(req, res, next) {
    res.render('dashboard', {});
});

router.get('/dashboard/addresses', auth.Authentication, async function(req, res, next) {
    var user = await User.findById(req.session.user._id).populate('addresses').exec();
    res.render('addresses', {addresses : user.addresses});
});

router.post('/dashboard/addresses', auth.Authentication, async function(req, res, next) {
    var { state, city, address, plaque, postcode, unit } = req.body;
    var result = await Address.add({
        userToken: req.session.user.token, 
        inputState: state, 
        inputCity: city, 
        inputAddress: address, 
        inputPlaqe: plaque, 
        inputPostcode: postcode, 
        inputUnit: unit }
    );
    if (result) {
        
    }
    res.redirect('/dashboard/addresses');
});

router.get('/dashboard/orders', auth.Authentication, async function(req, res, next) {
    res.render('orders', {});
});

router.get('/dashboard/setting', auth.Authentication, async function(req, res, next) {
    res.render('setting', {});
});

router.get('/dashboard/cart', auth.Authentication, async function(req, res, next) {
    res.render('cart', {});
});

router.get('/dashboard/wishlist', auth.Authentication, async function(req, res, next) {
    res.render('wishlist', {});
});

module.exports = router;