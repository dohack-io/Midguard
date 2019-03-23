'use strict';

// Extern Dependencies
const config = require('./config'),
    express = require('express'),
    bodyParser = require('body-parser'),
    passport = require('passport');

// App specific modules
const hookStrategies = require('./services/passportStrategy');
const db = require('./services/database');

// Initializations

// Init express js
let app = express();

// Init bodyParser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Init passport js
app.use(passport.initialize());

// Init database
db.sync().catch(((err) => console.log(err)));

// Init passport strategies
hookStrategies(passport);

// Bundle API routes.
app.use('/auth', require('./routes/auth'));
app.use('/api', require('./routes/api')(passport));

// Catch all route.
app.get('*', (req, res) => res.status(404).send("404: Not Found") );

// Start server
app.listen(config.server.port, () => console.log('Gateway running on' + config.server.url + config.server.port + '!'));