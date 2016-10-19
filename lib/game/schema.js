'use strict';

// External dependecies
const Mongoose = require('mongoose');
// const Database = require('../../../config/database');

const GameSchema = new Mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    scope: {
        type: String,
        enum: ['Customer'],
        default: ['Customer'],
        required: true
    },
    isVerified: {
        type: Boolean,
        default: false
    }
});

module.exports = Mongoose.model('game', GameSchema);
