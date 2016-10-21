'use strict';

//
// Configuration 📒
//
const config = require('../config/config.js');

//
// External modules 📦
//
const debug = require('debug')('summoner-dao');

//
// Local modules 📦
//
const leagueApi = require('../riot-api-wrapper');
const Summoner = require('./summoner-model');

//
// Code 🛠
//
const league = new leagueApi(config.RIOT_API_KEY);

const getFromStorage = (name, cb) => {
    let id = null;
    Summoner.find({ name }, (err, result) => {
        if (!err && result.length) {
            debug("Result from the DB");
            console.log(result);
            id = result[0].id;
        } else {
            debug('Error (%s) finding: %s in database', err, name);
        }
        cb(err, id);
    });
};

// const getFromCache = (name, cb) => {
// }

// Get summoner data from API
const getFromApi = (name, cb) => {

    debug("get(" + name + ")");
    league.getSummonersByName('euw', name, (err, data) => {
        const id = data[name].id;
        debug("Got summonerId: " + id);

        const summoner = new Summoner({name, id});
        // Saving can be done in parallel therefor no callback
        save(summoner, () => {});
        cb(err, id);
    });
};

const save = (summoner, cb) => {

    summoner.save((err) => {
        if (err) {
            debug("Failed saving: %s", summoner);
        } else {
            debug("Saved: %s", summoner);
        }
        cb(err);
    });
};

const get = (name, cb) => {

    getFromStorage(name, (err, id) => {
        if (null !== id) {
            cb(err, id);
        } else {
            getFromApi(name, (err, id) => {
                if (!err) {
                    cb(err, id);
                }
            });
        }
    });
};

//
// Exports 📤
//
module.exports = {
    get
};
