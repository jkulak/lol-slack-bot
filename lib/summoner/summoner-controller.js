'use strict';

//
// External modules 📦
//
const debug = require('debug')('summoner-controller');

//
// Local modules 📦
//
const Summoner = require('./summoner-model');

//
// Code 🛠
//
const getId = (request, reply) => {

    const name = request.params.name;

    debug("getId(" + name + ")");
    let id = null;

    // 1. Check for that name in DB

    // 2. If yes -> return it

    // 3. If not, run the Request
    id = Summoner.get(name, (err, id) => {
        return reply(id);
    });
};

//
// Exports 📤
//
module.exports = {
    getId
};
