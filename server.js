/*
20190422 - referenced from robot project

Please ignore for now... use this instead:

https://www.npmjs.com/package/http-server <-- it's dangerous to go alone, take this
  https://www.npmjs.com/package/http-server
    https://www.npmjs.com/package/http-server
      https://www.npmjs.com/package/http-server

      ## ### ##### #######
*/

// https://github.com/websockets/ws
// https://www.npmjs.com/package/ws#sending-and-receiving-text-datas

// const WebSocket = require('ws');
// // WebSocket.Server({ port: 8080 });
// // const ws = new WebSocket('ws://www.host.com/path');
// const ws = new WebSocket({ port: 8080 });

// ws.on('open', function open() {
//   ws.send('something');
// });

// ws.on('message', function incoming(data) {
//   console.log(data);
//   send_val(data)
// });


// const WebSocket = require('ws');

// const wss = new WebSocket.Server({
//   port: 8080,
//   perMessageDeflate: {
//     zlibDeflateOptions: {
//       // See zlib defaults.
//       chunkSize: 1024,
//       memLevel: 7,
//       level: 3
//     },
//     zlibInflateOptions: {
//       chunkSize: 10 * 1024
//     },
//     // Other options settable:
//     clientNoContextTakeover: true, // Defaults to negotiated value.
//     serverNoContextTakeover: true, // Defaults to negotiated value.
//     serverMaxWindowBits: 10, // Defaults to negotiated value.
//     // Below options specified as default values.
//     concurrencyLimit: 10, // Limits zlib concurrency for perf.
//     threshold: 1024 // Size (in bytes) below which messages
//     // should not be compressed.
//   }
// });


// https://tecadmin.net/install-latest-nodejs-npm-on-ubuntu/
// var http = require('http');
// http.createServer(function (req, res) {
//   res.writeHead(200, {'Content-Type': 'text/plain'});
//   res.end('Hello World\n');
// }).listen(3000, "127.0.0.1");
// console.log('Server running at http://127.0.0.1:3000/');


const app = require("https-localhost")()
// app is an express app, do what you usually do with express
// app.listen('8080')
// To redirect the http traffic to https use app.redirect().
app.redirect();
app.serve();
// app.listen(8080);


// initLocalHost();
// async function initLocalHost() {
// 	const httpsLocalhost = require("https-localhost")()
// 	// const app = ...
// 	// const port = 443
// 	const certs = await httpsLocalhost.getCerts()
// 	const server = https.createServer(certs, app).listen(port)
// }