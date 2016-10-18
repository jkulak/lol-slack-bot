'use strict';

const config = require('../config.js');
const debug = require('debug')('bot');

debug('Booting %s', __filename);
debug("Environment: %s", config.ENV);

const waterfall = require('async/waterfall');
const leagueApi = require('../lib/riot-api-wrapper');
const league = new leagueApi(config.RIOT_API_KEY);

const _processGames = function(games) {

    // TODO: don't create HTML here!!! Return only a list
    let response = '<ul>';
    for (let value of games) {
        response += "<li class=\"" + (value.stats.win?"won":"lost") + "\">" + value.stats.win + "</li>";
    }
    response += "</ul>";
    return response;
};

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
                mainCallback(null, _processGames(data.games));
            });
        }
    ], function(err, result){
    });
}

module.exports = {
    showGameResults
};
