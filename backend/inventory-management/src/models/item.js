let Sequelize = require('sequelize');

let db = require('../services/database');

let ItemModel = db.define('Item', {
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
    }
});

module.exports = ItemModel;
