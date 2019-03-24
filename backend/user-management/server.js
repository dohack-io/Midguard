// Extern Dependencies
const config = require('./config'),
    express = require('express'),
    cors = require('cors'),
    bodyParser = require('body-parser');

// App specific modules
const db = require('./src/services/database');

// Initializations

// Init express js
let app = express();

app.use(cors());

// Init bodyParser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Init database
db.sync().catch(((err) => console.log(err)));

// Bundle API routes.
app.use('/user', require('./src/routes/api'));

// Catch all route.
app.get('*', (req, res) => res.status(404).send("404: Not Found") );

// Start server
app.listen(config.server.port, () => console.log('Gateway running on' + config.server.url + config.server.port + '!'));
