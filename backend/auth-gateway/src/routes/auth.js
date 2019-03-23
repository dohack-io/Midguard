const router = require('express').Router();

const AuthController = require('../controller/authController');

router.post('/local/signup', AuthController.signUp);
router.post('/local/login', AuthController.login);

module.exports = router;