'use strict';

//
// Configuration 📒
//
const config = require('../../config/config.js');

//
// External modules 📦
//
const debug = require('debug')('game-model');

//
// Local modules 📦
//
const leagueApi = require('../riot-api-wrapper');

//
// Code 🛠
//
const league = new leagueApi(config.RIOT_API_KEY);

// Get last games for summoner id
const getLastGames = (summonerId, callback) => {

    debug("getLastGames(" + summonerId + ")");

    league.getRecentGames('euw', summonerId, (err, data) => {
        debug("Got recent games: " + data);
        callback(err, data.games);
    });
};

//
// Exports 📤
//
module.exports = {
    getLastGames
};
