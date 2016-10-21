'use strict';

//
// External modules 📦
//
// const debug = require('debug')('router-summoners');

//
// Local modules 📦
//
const summonersController = require('../summoner/summoner-controller');
const gamesController = require('../game/game-controller');

//
// Code 🛠
//
exports.register = function (server, options, next) {

    server.route({
        method: 'GET',
        path: '/summoners/{name}',
        handler: summonersController.getId
    });

    server.route({
        method: 'GET',
        path: '/summoners/{name}/games',
        handler: gamesController.getLastGames
    });

    return next();
};

//
// Exports 📤
//
exports.register.attributes = {
    name: 'routes-summoners'
};
