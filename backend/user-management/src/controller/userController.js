const db = require('../services/database'),
    Sequelize = require('sequelize'),
    User = require('../models/user');


// The authentication controller.
let UserController = {};


UserController.getAllUsers = function (req, res) {
    User.findAll().then(
        (users) => res.status(200).send(users)
    )
};

UserController.getUserById = function (req, res) {
    User.findByPk(req.params.id).then(
        (user) => res.status(200).send(user)
    );
};

UserController.getUserByName = function (req, res) {
    User.findOne({where: {username: req.params.name}}).then(
        (user) => res.status(200).send(user)
    );
};

UserController.createNewUser = function (req, res) {
    if (!req.body.username) {
        res.status(406).json({message: 'Please provide a email and a password.'});
    } else {
        db.sync().then(() => {
            let newUser = {
                username: req.body.username,
            };
            return User.create(newUser).then(() => res.status(201).json({message: 'User created!'}));
        }).catch(function (error) {
            res.status(403).json({message: error});
        });
    }
};

UserController.updateLevel = function (rep, res) {
    User.update(
        {level: Sequelize.literal('level + 1')},
        {where: {id: req.params.id}})
        .then(function (rowsUpdated) {
            res.json(rowsUpdated)
        }).catch(next);
};

UserController.updateCommunity = function (rep, res) {
    User.update(
        {communityId: req.body.communityId},
        {where: {id: req.params.id}})
        .then(function (rowsUpdated) {
            res.json(rowsUpdated)
        }).catch(next);
};

UserController.withdrawCredits = function (rep, res) {
    User.update(
        {credits: Sequelize.literal('credits - ' + req.body.amount)},
        {where: {id: req.params.id}})
        .then(res.status(200).send({message: "succes"})).catch(next);
};

UserController.depositCredits = function (rep, res) {
    User.update(
        {credits: Sequelize.literal('credits + ' + req.body.amount)},
        {where: {id: req.params.id}})
        .then(res.status(200).send({message: "succes"})).catch(next);
};

UserController.updateSkillPoints = function (rep, res) {
    User.update(
        {skillPoints:Sequelize.literal('skillPoints + ' + req.body.amount)},
        {where: {id: req.params.id}})
        .then(res.status(200).send({message: "succes"})).catch(next);
};

UserController.updateOfferedItems = function (req, res) {
    User.setOfferedItems(
        {communityId: req.body.offeredItems},
        {where: {id: req.params.id}});
    res.status(200).send({message: "succes"});
};

module.exports = UserController;