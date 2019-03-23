const db = require('../services/database'),
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

module.exports = UserController;