let config = module.exports;

config.db = {
    user: 'root',
    password: 'root',
    name: 'task_management'
};

config.db.details = {
    host: 'localhost',
    port: 3306,
    dialect: 'mysql'
};

config.server = {
    port: 1340,
    url: "localhost"
};
