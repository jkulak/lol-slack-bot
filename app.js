'use strict';

// Configuration
const config = require('./config/config.js');

// External dependecies
const debug = require('debug')('server');
const Hapi = require('hapi');

// Local dependecies
const bot = require('./lib/bot.js');

const server = new Hapi.Server();
server.connection({
    port: config.WEB_SERVER.PORT
});

// Router
server.route({
    method: 'GET',
    path:'/summoner',
    handler: function (request, reply) {

        return reply('Hola! You are looking for information about summoner...');
    }
});

// Start the server
server.start((err) => {

    if (err) {
        throw err;
    }
    debug('Server running at: %s', server.info.uri);
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
