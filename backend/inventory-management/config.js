let config = module.exports;

config.db = {
    user: 'root',
    password: '',
    name: 'inventory'
};

config.db.details = {
    host: 'localhost',
    port: 3306,
    dialect: 'mysql'
};

config.server = {
    port: 1338,
    url: "localhost"
};
