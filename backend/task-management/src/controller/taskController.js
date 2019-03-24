const config = require('../../config'),
    db = require('../services/database'),
    RunningTask = require('../models/runningTask'),
    Task = require('../models/task');

let TaskController = {};

TaskController.getTaskById = function (req, res) {
    Task.findByPk(req.params.id).then((task) =>
    res.status(200).send(task));
};

TaskController.cancelTask = function (req, res) {
    RunningTask.destroy({where: {userID: req.params.userID}});
};

TaskController.getServerTime = function (req, res) {
  res.status(200).send(new Date());
};

TaskController.getAllTasksOfProf = function (req, res) {
  Task.findAll({where: {profession: req.params.profession}}).then((tasks) =>
  res.status(200).send(tasks));
};

TaskController.getTaskOfUser = function (req, res) {
  RunningTask.findOne({where: {userID: req.params.id}}).then((task) =>
  res.status(200).send(task));
};

TaskController.setTaskOfUser = function (req, res) {
    Task.findByPk(req.params.taskID).then((task) => {
        let rTask = {name: task.name, reward: task.reward, required: task.required,
            duration: task.duration, icon: task.icon, profession: task.profession,
            startTime: new Date(), userID: req.params.userID};
        RunningTask.create(rTask);
        res.status(200).send({message: "Task Changed"});
    });
};

TaskController.getRunningTaskById = function (req, res) {
    RunningTask.findByPk(req.params.id).then( task => res.status(200).send(task));
};

module.exports = TaskController;
