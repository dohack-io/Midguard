const config = require('./config'),
    express = require('express'),
    bodyParser = require('body-parser');

const db = require('./src/services/database');

let app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

db.sync().catch(((err) => console.log(err)));

app.use('/item', require('./src/routes/itemRoute'));
app.use('/inventory', require('./src/routes/inventoryRoute'));

app.get('*', (req, res) => res.status(404).send("404: Not Found") );

app.listen(config.server.port, () => console.log('Gateway running on' + config.server.url + config.server.port + '!'));
