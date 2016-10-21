'use strict';

//
// External modules 📦
//
const debug = require('debug')('summoner-controller');

//
// Local modules 📦
//
const SummonerDao = require('./summoner-dao');

//
// Code 🛠
//
const getId = (request, reply) => {

    const name = request.params.name;

    debug("getId(" + name + ")");

    // 1. Check for that name in DB

    // 2. If yes -> return it

    // 3. If not, run the Request
    SummonerDao.get(name, (err, id) => {
        if (err) {
            debug("Error getting summoner: %s", err);
        }
        return reply({id});
    });
};

//
// Exports 📤
//
module.exports = {
    getId
};
