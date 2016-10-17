'use strict';

let config = require('./config.js');

const debug = require('debug')('lol-slack-bot');
debug('booting %s', __filename);
debug("Environment: %s", config.ENV);

let waterfall = require('async/waterfall');
let leagueApi = require('league-api');
let league = new leagueApi(config.RIOT_API_KEY);

let bot = require('./lib/bot.js');

let summonerId = null;
let summonerName = 'almostroy';

waterfall([
    function (callback) {
        league.getSummonersByName('euw', summonerName, function(err, data) {
            summonerId = data[summonerName].id;
            callback(null, summonerId);
        });
    },
    function (summonerId, callback) {
        league.getRecentGames('euw', summonerId, function(err, data) {
            bot.processGames(data.games);
            callback(null, 'done');
        });
    }
], function(err, result){
    debug(result);
});
