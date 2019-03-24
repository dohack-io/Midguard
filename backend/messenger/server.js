const express = require('express'),
    messengerController = require('./src/controller/messengerController'),
    http = require('http'),
    cors = require('cors'),
    socketIO = require('socket.io'),
    config = require('./config'),
    db = require('./src/services/database'),
    messengerSocket = require('./src/messengerSocket');


let app = express(),
    server = http.Server(app),
    io = socketIO(server);

app.use(cors());

// Init database
db.sync().catch(((err) => console.log(err)));

messengerSocket(io);

app.post('/conversation', messengerController.createNewConversation);
app.get('/conversation', messengerController.getConversationList);

// Start server
app.listen(config.server.port, () => console.log('Server running on ' + config.server.url + ':' + config.server.port + '!'));
