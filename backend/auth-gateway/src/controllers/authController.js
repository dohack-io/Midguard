'use strict';

const jwt = require('jsonwebtoken');

const config = require('../config'),
    db = require('../services/database'),
    User = require('../models/userLocal');

// The authentication controller.
let AuthController = {};

// Register a local user.
AuthController.signUp = function (req, res) {
    if (!req.body.email || !req.body.password) {
        res.status(406).json({message: 'Please provide a email and a password.'});
    } else {
        db.sync().then(function () {
            let newUser = {
                email: req.body.email,
                password: req.body.password
            };
            return User.create(newUser).then(() => res.status(201).json({message: 'Account created!'}));
        }).catch(function (error) {
            res.status(403).json({message: error});
        });
    }
};

// Verify a local user
AuthController.login = function (req, res) {
    if (!req.body.email || !req.body.password) {
        res.status(404).json({message: 'eMail and password are needed!'});
    } else {
        let email = req.body.email,
            password = req.body.password,
            potentialUser = {where: {email: email}};
        User.findOne(potentialUser).then((user) => {
            if (!user) {
                res.status(404).json({message: 'Authentication failed!'});
            } else {
                user.comparePasswords(password, (error, isMatch) => {
                    console.log(user);
                    if (isMatch && !error) {
                        let token = generateAccessToken(user.id, user.email, 'local');
                        res.json({success: true, token: "jwt " + token});
                    } else {
                        res.status(404).json({message: 'Login failed!'});
                    }
                });
            }
        }).catch((error) => {
            console.log(error);
            res.status(500).json({
                message: 'There was an error!',
                error: error
            });
        });
    }
};

function generateAccessToken(userId, email, authType) {
    const expiresIn = '1 hour';
    const secret = config.keys.secret;
    return jwt.sign({email: email, authType: authType},
        secret, {
            expiresIn: expiresIn,
            subject: userId.toString()
        });
}

module.exports = AuthController;