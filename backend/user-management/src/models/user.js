let Sequelize = require('sequelize'),
    db = require('../services/database');

let UserModel = db.define('User', {
    username: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
    },
    level: {
        type: Sequelize.INTEGER,
        defaultValue: 1
    },
    communityId: {
        type: Sequelize.INTEGER,
        defaultValue: null
    },
    credits: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    },
    skillPoints: {
        type: Sequelize.INTEGER,
        defaultValue: 1
    },
    offeredItems: {
        type: Sequelize.STRING,
        getOfferedItems() {
            return this.getDataValue('offeredItems').split(';')
        },
        setOfferedItems(val) {
            this.setDataValue('offeredItems',val.join(';'))
        },
        defaultValue: ''
    }
});

module.exports = UserModel;