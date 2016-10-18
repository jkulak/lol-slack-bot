'use strict';

const http = require("http");
const url = require("url");
const config = require('./config.js');
const showGameResults = require('./lib/bot.js').showGameResults;
const debug = require('debug')('server');
const mustache = require('mustache');

function sendResponse(res, body) {

    const view = {
        title: "Joe",
        calc: function() {
            return 2 + 4;
        },
        body
    };

    const template = "{{title}} spends {{body}}";
    var html = mustache.to_html(template, view);

    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(html);
}

http.createServer(function (req, res) {

    const parsedUrl = url.parse(req.url, true); // true to get query as object
    const queryAsObject = parsedUrl.query;
    const summonerName = queryAsObject.summonerName;

    showGameResults(summonerName, function(err, body) {
        sendResponse(res, body);
    });

}).listen(config.WEB_SERVER.PORT);

// Console will print the message
debug('Server started!');
