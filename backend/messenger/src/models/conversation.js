const Sequelize = require("sequelize"),
    db = require ('./../services/database');

// message model
const ConversationModel = db.define('message', {
    user1: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    user2: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    lastMessage: {
        type: Sequelize.TEXT
    }
});

module.exports = ConversationModel;