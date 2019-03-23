let Sequelize = require('sequelize');

let db = require('../services/database');

let TaskModel = db.define('Task', {
    name: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
    },
    icon: {
        type: Sequelize.STRING,
        allowNull: false
    },
    reward: {
        type: Sequelize.STRING,
        get() {
            return this.getDataValue('reward').split(';')
        },
        set(val) {
            this.setDataValue('reward',val.join(';'))
        },
        defaultValue: ''
    },
    required: {
        type: Sequelize.STRING,
        get() {
            return this.getDataValue('required').split(';')
        },
        set(val) {
            this.setDataValue('required',val.join(';'))
        },
        defaultValue: ''
    },
    duration: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    profession: {
        type: Sequelize.STRING,
        allowNull: false
    }
}, {timestamps: false});

module.exports = TaskModel;
