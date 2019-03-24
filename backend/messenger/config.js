let config = module.exports;

config.db = {
    user: 'root',
    password: 'root',
    name: 'messenger'
};

config.db.details = {
    host: 'localhost',
    port: 3306,
    dialect: 'mysql'
};

config.server = {
    port: 1341,
    url: "localhost"
};
