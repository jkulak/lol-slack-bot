'use strict';

// Configuration
const config = require('./config/config.js');

// External dependecies
const debug = require('debug')('server');
const Hapi = require('hapi');
const mongojs = require('mongojs');

// Local dependecies
const bot = require('./lib/bot.js');

const server = new Hapi.Server();
server.connection({
    port: config.WEB_SERVER.PORT
});

//Connect to db
server.app.db = mongojs('hapi-rest-mongo', ['books']);

//Load plugins and start server
server.register([
    require('./routes/summoners')
], (err) => {

    if (err) {
        throw err;
    }

    // Start the server
    server.start((err) => {
        debug('Server running at: %s', server.info.uri);
    });
});

//
// function sendResponse(res, body) {
//
//     res.writeHead(200, {'Content-Type': 'text/html'});
//     res.end(body);
// }
//
// http.createServer(function (req, res) {
//
//     const parsedUrl = url.parse(req.url, true); // true to get query as object
//     const queryAsObject = parsedUrl.query;
//     const summonerName = queryAsObject.summonerName;
//
//     bot.showGameResults(summonerName, function(err, body) {
//         sendResponse(res, body);
//     });
//
// }).listen(config.WEB_SERVER.PORT);
//
// // Console will print the message
// debug('Server started!');
