var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/dashboard', async function(req, res, next) {
    res.render('dashboard', {});
});

router.get('/dashboard/orders', async function(req, res, next) {
    res.render('orders', {});
});

module.exports = router;