'use strict';

// External dependencies
const mongoose = require('mongoose');
const debug = require('debug')('db');
debug('ssss');
//Connect to db
mongoose.connect('mongodb://localhost/lol');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    debug("Connected to database!");
});

module.exports = db;
