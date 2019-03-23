'use strict';

const router = require('express').Router();

const AuthController = require('../controllers/authController');

let AuthRoutes = function () {

    // Auth routes
    // Auth routes for local authentication
    router.post('/local/signup', AuthController.signUp);
    router.post('/local/login', AuthController.login);

    return router;
};

module.exports = AuthRoutes;