'use strict';

//
// External modules 📦
//
const debug = require('debug')('game-controller');

//
// Local modules 📦
//
const Game = require('./game-dao');
const Summoner = require('../summoner/summoner-dao');

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
