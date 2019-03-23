const router = require('express').Router();

const UserController = require('../controller/userController');

router.get('/all', UserController.getAllUsers);
router.get('/id/:id', UserController.getUserById);
router.get('/name/:name', UserController.getUserById);
router.post('/create', UserController.createNewUser);

module.exports = router;