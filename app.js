'use strict';

//
// External modules 📦
//
const debug     = require('debug')('app');

//
// Local modules 📦
//
const serverLib = require('./lib/server');
const dbLib     = require('./lib/database.js');
const routes    = require('./routes/summoners');

//
// Code 🛠
//
debug('Starting the application: %s', __filename);
const server = serverLib.startServer(routes);

// Connect to db
const db = dbLib.startDatabase();
server.app.db = db;
