const Sequelize = require("sequelize"),
    db = require ('./../services/database');

// message model
const MessageModel = db.define('message', {
    chatID: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    message: {
        type: Sequelize.TEXT,
    },
    timestamp: {
        type: Sequelize.DATE
    },
    userID: {
        type: Sequelize.INTEGER
    },
    userName: {
        type: Sequelize.STRING
    }
});

module.exports = MessageModel; 