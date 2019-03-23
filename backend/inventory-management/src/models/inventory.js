let Sequelize = require('sequelize');

let db = require('../services/database');

let InventoryModel = db.define('Inventory', {
    userID: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    invItemID: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
});

module.exports = InventoryModel;
