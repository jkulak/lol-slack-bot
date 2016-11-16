const config = {};

config.ENV = process.env.NODE_ENV || 'development';
config.DEBUG = (config.ENV === 'development') || false;

config.RIOT_API_KEY = process.env.RIOT_API_KEY || 'your_api_key';

module.exports = config;

config.WEB_SERVER = {};
config.WEB_SERVER.PORT = process.env.WEB_SERVER_PORT || 8081;

config.DB = {};
config.DB.host = process.env.MONGO_HOST || 'mongo';
config.DB.database = process.env.MONGO_DATABASE || 'lol';
