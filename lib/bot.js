'use strict';

//
// Configuration 📒
//
const config = require('../config/config.js');

//
// External modules 📦
//
const debug = require('debug')('bot');
const waterfall = require('async/waterfall');
const leagueApi = require('../lib/riot-api-wrapper');

//
// Code 🛠
//
const league = new leagueApi(config.RIOT_API_KEY);

function showGameResults(summonerName, mainCallback) {

    waterfall([
        function (callback) {
            league.getSummonersByName('euw', summonerName, function(err, data) {
                const summonerId = data[summonerName].id;
                debug("Got summonerId: " + summonerId);
                callback(null, summonerId);
            });
        },
        function (summonerId) {
            league.getRecentGames('euw', summonerId, function(err, data) {
                mainCallback(null, data.games);
            });
        }
    ], function(err, result){
        debug(err);
        debug(result);
    });
}

//
// Exports 📤
//
module.exports = {
    showGameResults,
};
