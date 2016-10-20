'use strict';

//
// Configuration 📒
//
const config = require('../config/config.js');

//
// External modules 📦
//
const mongoose = require('mongoose');
const debug = require('debug')('db');

//
// Code 🛠
//
const startDatabase = () => {

    const connectionUrl = config.DB.host + '/' + config.DB.database;
    mongoose.connect(connectionUrl);

    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', () => {
        debug("Connected to database at: %s", connectionUrl);
    });

    return db;
};

//
// Exports 📤
//
module.exports = {
    startDatabase
};
