

const WebSocket = require('ws');
 
const wss = new WebSocket.Server({ port: 8080 });
 
wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(message) {
    // console.log('received: %s', message);
    send_val(message);
  });
 
  ws.send('something');
});












// var WebSocketServer = require('websocket').server;
// var http = require('http');

// var server = http.createServer(function(request, response) {
//   // process HTTP request. Since we're writing just WebSockets
//   // server we don't have to implement anything.
// });
// server.listen(1337, function() { });

// // create the server
// wsServer = new WebSocketServer({
//   httpServer: server
// });

// // WebSocket server
// wsServer.on('request', function(request) {
//   var connection = request.accept(null, request.origin);

//   // This is the most important callback for us, we'll handle
//   // all messages from users here.
//   connection.on('message', function(message) {
//     console.log('thingaling')
//     if (message.type === 'utf8') {
//       // process WebSocket message
//     }
//   });

//   connection.on('close', function(connection) {
//     // close user connection
//   });
// });