'use strict';

//
// External modules 📦
//
const Boom = require('boom');
const debug = require('debug')('routee-summoners');

//
// Local modules 📦
//
const summonersController = require('../lib/summoner/summoner-controller');
const gamesController = require('../lib/game/game-controller');

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
