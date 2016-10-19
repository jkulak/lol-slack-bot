'use strict';

//
// External modules 📦
//
const Mongoose  = require('mongoose');

//
// Code 🛠
//
const GameSchema = new Mongoose.Schema({
    name: String,
    gameId: Number,
    championId: Number,
    stats: {
        level: Number,
        goldEarned: Number,
        win: Boolean,
        championsKilled: Number,
        "numDeaths": Number,
        assists: Number,
    }
});

//
// Exports 📤
//
module.exports = Mongoose.model('game', GameSchema);
