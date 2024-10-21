var express = require('express');
var router = express.Router();

router.use('/auth', require('./Auth/auth.route'));
router.use('/social', require('./Social/social.route'));


module.exports = router;