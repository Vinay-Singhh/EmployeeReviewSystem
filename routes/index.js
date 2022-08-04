const express = require('express');
const router = express.Router();
const homeController = require('../controllers/home_controller');

const passport = require('passport');

// for any futher routes, access from here
router.get('/', passport.checkAuthentication, homeController.home);

router.use('/users', require('./users'));

router.use('/admin', require('./admin'));

router.use('/reviews', require('./review'));

module.exports = router;