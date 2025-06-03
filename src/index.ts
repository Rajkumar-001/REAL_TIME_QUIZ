import { server as WebSocketServer } from 'websocket';
import * as http from 'http';


var server = http.createServer(function (request: any, response: any) {
    console.log((new Date()) + ' received request for the url ' + request.url)
    response.writeHead(404);
    response.end();
})

server.listen(8080, function () {
    console.log((new Date()) + ' server is listening on the port');
})

const wsServer = new WebSocketServer({
    httpServer: server,
    autoAcceptConnections: false,
});

function originIsAllowed(origin: string) {
    return true;
}

wsServer.on('request', function (request: any) {
    if (!originIsAllowed(request.origin)) {
        request.reject();
        console.log((new Date()) + ' request rejection ');
        return;
    }

    var connection = request.accept('echo-protocol', request.origin);
    console.log((new Date()) + " Connection Accepted ");
    connection.on('message', function (message: any) {
        if (message.type == 'utf8') {
            console.log("Received Message " + message.utf8Data)
            connection.sendUtf8(message.utf8Data);
        } else if (message.type == 'binary') {
            console.log('Received Message ' + message.binaryData)
            connection.sendBinaryData('Recieved Message ' + message.binaryData)
        }

    });

    connection.on('close', function (reasonCode: any, description: any) {
        console.log((new Date()) + ' Peer ' + connection.remoteAddress + ' disconnected.');
    });
})





