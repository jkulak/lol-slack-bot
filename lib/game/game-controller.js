'use strict';

//
// External modules 📦
//
const debug = require('debug')('game-controller');

//
// Local modules 📦
//
const Game = require('./game-model');
const Summoner = require('../summoner/summoner-model');

//
// Code 🛠
//
const getLastGames = (request, reply) => {

    const name = request.params.name;
    debug("getLastGames(" + name + ")");

    Summoner.get(name, (err, id) => {
        Game.getLastGames(id, (err, data) => {
            reply.view('games', {
                data
            });
        });
    });
};

//
// Exports 📤
//
module.exports = {
    getLastGames
};
