'use strict';

//
// External modules 📦
//
const debug = require('debug')('app');

//
// Local modules 📦
//
const serverLib = require('./lib/server');
const dbLib = require('./lib/database.js');
const summonersRoutes = require('./lib/routes/summoners');
const staticRoutes = require('./lib/routes/static');

//
// Code 🛠
//
debug('Starting the application: %s', __filename);
const server = serverLib.startServer([summonersRoutes, staticRoutes]);

// Connect to db
const db = dbLib.startDatabase();
server.app.db = db;
