const config = require('./config'),
    express = require('express'),
    cors = require('cors'),
    bodyParser = require('body-parser');

const db = require('./src/services/database');

let app = express();

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

db.sync().catch(((err) => console.log(err)));

app.use('/task', require('./src/routes/taskRoute'));

app.get('*', (req, res) => res.status(404).send("404: Not Found") );

app.listen(config.server.port, () => console.log('Service running on' + config.server.url + ':' + config.server.port + '!'));
