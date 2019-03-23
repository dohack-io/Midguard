let Sequelize = require('sequelize'),
    bcrypt = require('bcrypt');

let db = require('../services/database');

// Define the User model
let UserModel = db.define('localUser', {
    username: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    }
},{
        hooks: {
            beforeValidate: hashPassword
        }
});

UserModel.prototype.comparePasswords = function (password, callback) {
    bcrypt.compare(password, this.password, function (err, isMatch) {
        if (err) return callback(err);
        return callback(null, isMatch);
    });
};

function hashPassword(user) {
    if (user.changed('password')) {
        return bcrypt.hash(user.password, 10).then(function (password) {
            user.password = password;
        });
    }
}

module.exports = UserModel;