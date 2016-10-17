//
// var http = require("http");
//
// http.createServer(function (request, response) {
//
//
//     var league_api = require('league-api');
//     var league = new league_api('RGAPI-ED9CFACE-A8C2-4EBF-86AB-83321D382A67');
//
//     var summonerId = null;
//
//     league.getSummonersByName('euw', 'almostroy', function(data) {
//         console.log(data);
//     });
//
//     league.getRecentGames('euw', '86950135', function(data) {
//         console.log("Response:");
//         console.log(data);
//     });
//
//    // Send the HTTP header
//    // HTTP Status: 200 : OK
//    // Content Type: text/plain
//    response.writeHead(200, {'Content-Type': 'text/plain'});
//
//    // Send the response body as "Hello World"
//    response.end('Hello World\n');
// }).listen(8081);
//
// // Console will print the message
// console.log('Server running at http://127.0.0.1:8081/');
