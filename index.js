#!/usr/bin/env node
const config = require('./config')
const fs = require('fs')

/**
 * Module dependencies.
 */

let app = require('./app');
let debug = require('debug')('corp-api:server');
const http = require('http');
const https = require('https');

// const credentials = {
//     key: fs.readFileSync(config.keys.privkey, 'utf8'),
//     cert: fs.readFileSync(config.keys.cert, 'utf8'),
//     ca: fs.readFileSync(config.keys.chain, 'utf8')
// }
/**
 * Get port from environment and store in Express.
 */

let port = normalizePort(process.env.PORT || '3011');
app.set('port', port);

/**
 * Create HTTPs server.
 */


const server = http.createServer(app)
// const server = https.createServer(credentials, app)
/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
    var port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    var bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
    var addr = server.address();
    var bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port;
    debug('Listening on ' + bind);
}
