'use strict';

//
// Configuration 📒
//
const config = require('../config/config.js');

//
// External modules 📦
//
const debug = require('debug')('game-dao');

//
// Local modules 📦
//
const leagueApi = require('../riot-api-wrapper');
// const GameModel = require('./game-model');

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

// // Iterate through the array in the reulst
// for (let value of data) {
//
//     // Save each game in the database
//     const gameObj = {
//         gameId: value.gameId,
//         championId: value.championId,
//         stats: {
//             level: value.stats.level,
//             goldEarned: value.stats.goldEarned,
//             win: value.stats.win,
//             championsKilled: value.stats.championsKilled,
//             numDeaths: value.stats.numDeaths,
//             assists: value.stats.assists,
//         }
//     };
//
//     const game = new GameSchema(gameObj);
//
//     game.save((err) => {
//         if (err) {
//             debug("Failed saving: %s", game);
//         } else {
//             debug("Saved: %s", game);
//         }
//     });
//
//     // stats = (value.stats.championsKilled || 0) + "/" + (value.stats.numDeaths || 0) + "/" + (value.stats.assists || 0)+ " - 💰" + (value.stats.goldEarned || 0);
//     // response += "<li class=\"" + (value.stats.win?"won":"lost") + "\">" + new Date(value.createDate) + " - " + (value.stats.win?"✅":"🚫") + " - " + stats + "</li>";
// }
