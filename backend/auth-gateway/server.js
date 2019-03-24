// Extern Dependencies
const config = require('./config'),
    express = require('express'),
    cors = require('cors'),
    bodyParser = require('body-parser'),
    passport = require('passport');

// App specific modules
const hookStrategies = require('./src/services/passportStrategy');
const db = require('./src/services/database');

// Initializations

// Init express js
let app = express();

// Access-Control-Allow-Origin: *
app.use(cors());

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
app.use('/auth', require('./src/routes/auth'));
app.use('/api', require('./src/routes/api')(passport));

// Catch all route.
app.get('*', (req, res) => res.status(404).send("404: Not Found") );

// Start server
app.listen(config.server.port, () => console.log('Gateway running on ' + config.server.url + ':' + config.server.port + '!'));