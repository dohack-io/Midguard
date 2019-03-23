'use strict';

let JWTStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;

let UserLocal = require('./../models/userLocal'),
    config = require('../../config');

// Hooks the JWT Strategy.
function hookStrategies(passport) {
    let options = {};

    options.secretOrKey = config.keys.secret;
    options.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("jwt");
    options.ignoreExpiration = false;

    passport.use(new JWTStrategy(options, (JWTPayload, done) => {

        if (JWTPayload.authType === 'local') {
            UserLocal.findOne({ where: { email: JWTPayload.email } }).then((user, err) => {
                if (err) return done(err, false);
                if (!user) return done(null, false);
                return done(null, user);
            });
        }
    }));
}

module.exports = hookStrategies;