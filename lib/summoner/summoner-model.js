'use strict';

//
// External modules 📦
//
const Mongoose = require('mongoose');
Mongoose.Promise = global.Promise;

//
// Code 🛠
//
const SummonerSchema = new Mongoose.Schema({
    name: {type: String, required: true},
    id: {type: Number, required: true}
});

//
// Exports 📤
//
module.exports = Mongoose.model('summoner', SummonerSchema);
