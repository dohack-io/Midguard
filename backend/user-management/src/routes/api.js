const router = require('express').Router();

const UserController = require('../controller/userController');

router.get('/all', UserController.getAllUsers);
router.get('/id/:id', UserController.getUserById);
router.get('/name/:name', UserController.getUserByName);

router.post('/create', UserController.createNewUser);

router.post('/update/user/:id/level', UserController.updateLevel);
router.post('/update/user/:id/communityId', UserController.updateCommunity);
router.post('/update/user/:id/withdrawCredits', UserController.withdrawCredits);
router.post('/update/user/:id/depositCredits', UserController.depositCredits);
router.post('/update/user/:id/skillPoints', UserController.updateSkillPoints);
router.post('/update/user/:id/offeredItems', UserController.updateOfferedItems);

module.exports = router;
