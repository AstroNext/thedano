var express = require('express');
var User = require('../models/user');
var Address = require('../models/address');
var router = express.Router();

/* GET users listing. */
router.get('/', async function(req, res, next) {
  // let user = await User.AddUser('amir', '1234', '1234');
  // let test = await User.CanLogin('amir', '1234');
  // let address = await Address.AddAddress('$2b$10$gRFajhNT8Zj0ZB780gXBJeXeq4RSB3B.nonH.wWVKycX45E8DXCxS', 'fars','Shiraz', 'Modares', 10, 10, 1);
  // console.log(address)
  // let update = await Address.UpdateAddress('65cbb5a6b013df24301ed392', 'kordistan','sanandaj', 'modares', 12, 10, 1);
  // console.log(update)
  // var address2 = await Address.findById('65cbb7a69760f8cfd2ceea6f').populate('userId');
  // console.log(address2);
  // address2.userId.phonenumber = 555;
  // address2.userId.save();
  // var remove = await Address.RemoveAddress('65cbba79e7ca2b4f1c05abb1');
  // console.log(remove);
  res.send('respond with a resource', {});
});

router.post('/add', function(req, res, next) {
  res.send('respond with a resource', {});
});

module.exports = router;
