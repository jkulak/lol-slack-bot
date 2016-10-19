'use strict';

// Configuration
const config = require('./config/config.js');

// External dependecies
const debug = require('debug')('server');
const hapi = require('hapi');
// const db = require('./lib/database.js');

const server = new hapi.Server();
server.connection({
    port: config.WEB_SERVER.PORT
});

//Connect to db
// server.app.db = db;
debug('sfsd');

//Load plugins and start server
server.register([
    require('./routes/summoners')
], (err) => {

    if (err) {
        throw err;
    }

    // Start the server
    server.start((err) => {
        if (err) {
            debug('Error: %s', err);
        }

        debug('Started server at: %s', server.info.uri);
    });
});
