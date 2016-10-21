'use strict';

//
// Local modules 📦
//

//
// Code 🛠
//
exports.register = function (server, options, next) {

    server.route({
        method: 'GET',
        path: '/src/{param*}',
        handler: {
            directory: {
                path: 'public',
                listing: false
            }
        }
    });

    server.route({
        method: 'GET',
        path: '/s/{param*}',
        handler: {
            directory: {
                path: 'dist/assets',
                listing: false
            }
        }
    });

    return next();
};

//
// Exports 📤
//
exports.register.attributes = {
    name: 'routes-static'
};
