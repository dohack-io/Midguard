const httpProxy = require('express-http-proxy');

let config = module.exports;

config.db = {
    user: 'root',
    password: '',
    name: 'auth_gateway'
};

config.db.details = {
    host: 'localhost',
    port: 3306,
    dialect: 'mysql'
};

config.keys = {
    secret: 'VerySecretKey'
};

config.server = {
    port: 1337,
    url: "localhost"
};

config.proxy = {
    settings: [
        {
            endpointHook: "/inventory_management",
            proxySetting: httpProxy('http://localhost:1338'),
            secure: true
        },
        {
            endpointHook: "/user_management",
            proxySetting: httpProxy('http://localhost:1339'),
            secure: true
        },
        {
            endpointHook: "/task_management",
            proxySetting: httpProxy('http://localhost:1340'),
            secure: true
        },
        {
            endpointHook: "/messenger",
            proxySetting: httpProxy('http://localhost:1341'),
            secure: true
        }
    ]
};
