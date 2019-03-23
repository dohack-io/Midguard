'use strict';

const router = require('express').Router();
const config = require('./../config').proxy.settings;

let APIRoutes = function (passport) {

    // Add passport middleware if proxy secure flag is set to true
    function auth(req, res, next, proxy) {
        passport.authenticate('jwt', { session: false }, (err, user) => {
            if (err) { return next(err); }
            if(!user)  res.status(401).send("401: unauthorized");
            else proxy(req, res, next);
        })(req, res, next);
    }

    // Loads proxy list from the config and hooks them to the express
    function setupProxy() {
        config.forEach((proxy) => {
            router.use(proxy.endpointHook, (req, res, next) => {
                if(proxy.secure) {
                   auth(req, res, next, proxy.proxySetting);
                } else {
                    proxy.proxySetting(req, res, next);
                }
            });
        });
    }

    setupProxy();
    return router;
};

module.exports = APIRoutes;
