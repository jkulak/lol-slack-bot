'use strict';

//
// Configuration 📒
//
const config    = require('../config/config.js');

//
// External modules 📦
//
const hapi      = require('hapi');
const debug     = require('debug')('server');

//
// Code 🛠
//
const startServer = (routes) => {

    const server = new hapi.Server();

    server.connection({
        port: config.WEB_SERVER.PORT
    });

    //Load plugins and start server
    server.register(routes, (err) => {

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

    return server;
};

//
// Exports 📤
//
module.exports = {
    startServer
};
