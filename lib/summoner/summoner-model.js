'use strict';

//
// Configuration 📒
//
const config        = require('../../config/config.js');

//
// External modules 📦
//
const debug         = require('debug')('summoner-model');

//
// Local modules 📦
//
const leagueApi     = require('../riot-api-wrapper');

//
// Code 🛠
//
const league = new leagueApi(config.RIOT_API_KEY);

// Get summoner data from API
const get = (summonerName, callback) => {

    debug("get(" + summonerName + ")");

    league.getSummonersByName('euw', summonerName, (err, data) => {
        const summonerId = data[summonerName].id;
        debug("Got summonerId: " + summonerId);
        callback(err, summonerId);
    });
};

//
// Exports 📤
//
module.exports = {
    get
};
