const router = require('express').Router();

const TaskController = require('../controller/taskController');

router.get('/id/:id', TaskController.getTaskById);
router.post('/cancelTask/:userID', TaskController.cancelTask);
router.get('/serverTime', TaskController.getServerTime);
router.get('/getTasks/:profession', TaskController.getAllTasksOfProf);
router.get('/getUserTask/:id', TaskController.getTaskOfUser);
router.post('/setTask/:userID/:taskID', TaskController.setTaskOfUser);
router.get('/getRunTaskById/:id', TaskController.getRunningTaskById);

module.exports = router;
