'use strict';

//
// External modules 📦
//
const Boom          = require('boom');
const debug         = require('debug')('routee-summoners');

//
// Local modules 📦
//
const bot           = require('../lib/bot.js');
const GameSchema    = require('../lib/game/schema');

//
// Code 🛠
//
exports.register = function(server, options, next) {

    server.route({
        method: 'GET',
        path: '/summoners/{id}',
        handler: function (request, reply) {

            //
            // Using fake version of the function not to call RIOT API
            //
            bot.showGameResults(request.params.id, (err, data) => {

                if (err) {
                    return reply(Boom.wrap(err, 'Internal MongoDB error'));
                }

                if (!data) {
                    return reply(Boom.notFound());
                } else {

                    // Iterate through the array in the reulst
                    for (let value of data) {

                        // Save each game in the database
                        const gameObj = {
                            gameId: value.gameId,
                            championId: value.championId,
                            stats: {
                                level: value.stats.level,
                                goldEarned: value.stats.goldEarned,
                                win: value.stats.win,
                                championsKilled: value.stats.championsKilled,
                                numDeaths: value.stats.numDeaths,
                                assists: value.stats.assists,
                            }
                        };

                        const game = new GameSchema(gameObj);

                        game.save((err) => {
                            if (err) {
                                debug("Failed saving: %s", game);
                            } else {
                                debug("Saved: %s", game);
                            }
                        });

                        // stats = (value.stats.championsKilled || 0) + "/" + (value.stats.numDeaths || 0) + "/" + (value.stats.assists || 0)+ " - 💰" + (value.stats.goldEarned || 0);
                        // response += "<li class=\"" + (value.stats.win?"won":"lost") + "\">" + new Date(value.createDate) + " - " + (value.stats.win?"✅":"🚫") + " - " + stats + "</li>";
                    }
                }
                reply(data);
            });
        }
    });

    return next();
};

//
// Exports 📤
//
exports.register.attributes = {
    name: 'routes-summoners'
};
