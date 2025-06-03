"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var websocket_1 = require("websocket");
var http = require("http");
var server = http.createServer(function (request, response) {
    console.log((new Date()) + ' received request for the url ' + request.url);
    response.writeHead(404);
    response.end();
});
server.listen(8080, function () {
    console.log((new Date()) + ' server is listening on the port');
});
var wsServer = new websocket_1.server({
    httpServer: server,
    autoAcceptConnections: false,
});
function originIsAllowed(origin) {
    return true;
}
wsServer.on('request', function (request) {
    if (!originIsAllowed(request.origin)) {
        request.reject();
        console.log((new Date()) + ' request rejection ');
        return;
    }
    var connection = request.accept('echo-protocol', request.origin);
    console.log((new Date()) + " Connection Accepted ");
    connection.on('message', function (message) {
        if (message.type == 'utf8') {
            console.log("Received Message " + message.utf8Data);
            connection.sendUtf8(message.utf8Data);
        }
        else if (message.type == 'binary') {
            console.log('Received Message ' + message.binaryData);
            connection.sendBinaryData('Recieved Message ' + message.binaryData);
        }
    });
    connection.on('close', function (reasonCode, description) {
        console.log((new Date()) + ' Peer ' + connection.remoteAddress + ' disconnected.');
    });
});
