const MessageModel = require('./models/message');

module.exports = function (io) {


    io.on('connection', function (socket) {
        socket.on('join', function (data) {
            socket.username = data.username;
            socket.chatID = data.chatID;
            socket.join(chatID);
            MessageModel.findAll({where: {chatID: data.chatID}})
                .then(
                    (messages) => io.sockets.in(data.chatID.emit('history', messages))
                );
        });

        socket.on('disconnect', function (chatID) {
            socket.leave(chatID);
        });

        socket.on('send', function (data) {
            MessageModel.create(data)
                .then(() => io.sockets.in(data.chatID.emit('message', data)));
        });
    });
};