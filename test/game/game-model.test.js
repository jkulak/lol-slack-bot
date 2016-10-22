'use strict';

const expect = require('chai').expect;
const Game = require('../../lib/game/game-model');

const gameTemplate = function () {
    return {
        name: "test",
        gameId: 1,
        championId: 1,
        stats: {
            level: 1,
            goldEarned: 1,
            win: true,
            championsKilled: 1,
            numDeaths: 1,
            assists: 1,
        }
    };
};

describe('game', function () {

    let gameObj = {};

    before(function (done) {
        gameObj = new gameTemplate();
        done();
    });

    it('should be invalid if gameId is empty', function (done) {
        gameObj.gameId = null;
        const game = new Game(gameObj);
        game.validate(function (err) {
            expect(err.errors.gameId).to.exist;
            done();
        });
    });

    it('should be invalid if championId is empty', function (done) {
        gameObj.championId = null;
        const game = new Game(gameObj);
        game.validate(function (err) {
            expect(err.errors.championId).to.exist;
            done();
        });
    });

    it('should be invalid if stats.level is empty', function (done) {
        gameObj.stats.level = null;
        const game = new Game(gameObj);
        game.validate(function (err) {
            expect(err.errors['stats.level']).to.exist;
            done();
        });
    });

    it('should be invalid if stats.goldEarned is empty', function (done) {
        gameObj.stats.goldEarned = null;
        const game = new Game(gameObj);
        game.validate(function (err) {
            expect(err.errors['stats.goldEarned']).to.exist;
            done();
        });
    });
});
