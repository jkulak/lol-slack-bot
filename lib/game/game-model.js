'use strict';

//
// External modules 📦
//
const Mongoose = require('mongoose');
Mongoose.promise = global.Promise;

//
// Code 🛠
//
const GameSchema = new Mongoose.Schema({
    name: {type: String, required: true},
    gameId: {type: Number, required: true},
    championId: {type: Number, required: true},
    stats: {
        level: {type: Number, required: true},
        goldEarned: {type: Number, required: true},
        win: {type: Boolean, required: true},
        championsKilled: {type: Number, required: true},
        numDeaths: {type: Number, required: true},
        assists: {type: Number, required: true},
    }
});

//
// Exports 📤
//
module.exports = Mongoose.model('game', GameSchema);
