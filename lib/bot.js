'use strict';

function processGames(games) {
    for (let value of games) {
        console.log(value.stats.win);
    }
}

module.exports = {
    processGames: processGames
};
