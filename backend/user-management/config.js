let config = module.exports;

config.db = {
    user: 'root',
    password: '',
    name: 'user_management'
};

config.db.details = {
    host: 'localhost',
    port: 3306,
    dialect: 'mysql'
};

config.server = {
    port: 1339,
    url: "localhost"
};
