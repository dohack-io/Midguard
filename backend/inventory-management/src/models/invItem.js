let Sequelize = require('sequelize');

let db = require('../services/database');

let InvItemModel = db.define('InvItem', {
    name: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
    },
    icon: {
        type: Sequelize.STRING,
        allowNull: false
    },
    price: {
        type: Sequelize.DOUBLE,
        allowNull: false
    },
    amount: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
});

module.exports = InvItemModel;
