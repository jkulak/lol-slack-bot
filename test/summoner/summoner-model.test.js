'use strict';

var expect = require('chai').expect;

var Summoner = require('../../lib/summoner/summoner-model');

describe('summoner', () => {
    it('should be invalid if name is empty', (done) => {
        const summoner = new Summoner();

        summoner.validate(function(err) {
            expect(err.errors.name).to.exist;
            done();
        });
    });

    it('should be invalid if id is empty', (done) => {
        const summoner = new Summoner({name: "test"});

        summoner.validate(function(err) {
            expect(err.errors.id).to.exist;
            done();
        });
    });
});
