'use strict';

// External dependecies
const Boom = require('boom');
// const debug = require('debug')('router-summoners');

// Local dependecies
const bot = require('../lib/bot.js');

exports.register = function(server, options, next) {

    server.route({
        method: 'GET',
        path: '/summoners/{id}',
        handler: function (request, reply) {

            //
            // Using fake version of the function not to call RIOT API
            //
            bot.showGameResults_fake(request.params.id, (err, data) => {

                if (err) {
                    return reply(Boom.wrap(err, 'Internal MongoDB error'));
                }
            

                if (!data) {
                    return reply(Boom.notFound());
                } else {

                    // Save result in the DB
                    // db.results.save(data);
                }
                reply(data);
            });
        }
    });

    return next();
};

exports.register.attributes = {
    name: 'routes-summoners'
};
