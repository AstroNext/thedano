var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/admin', async function(req, res, next) {
    res.render('admin', {});
});

module.exports = router;