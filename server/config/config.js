const env = process.env.NODE_ENV || 'development';

const config = {
    development: {
        port: process.env.PORT || 3000,
        dbURL: process.env.DB_URL,
        origin: ['http://localhost:5555', 'http://localhost:4200'],
        cookieSecret: process.env.COOKIESECRET || 'BigSecret',
        authCookieName: 'auth-token'
    },
    production: {
        port: process.env.PORT || 3000,
        dbURL: process.env.DB_URL,
        origin: [],
        cookieSecret: process.env.COOKIESECRET || 'BigSecret',
        authCookieName: 'auth-token'
    }
};

module.exports = config[env];