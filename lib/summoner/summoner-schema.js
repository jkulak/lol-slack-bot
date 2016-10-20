'use strict';

//
// External modules 📦
//
const Mongoose = require('mongoose');

//
// Code 🛠
//
const SummonerSchema = new Mongoose.Schema({
    name: String,
    id: Number
});

//
// Exports 📤
//
module.exports = Mongoose.model('summoner', SummonerSchema);
