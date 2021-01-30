// import adapter from 'webrtc-adapter';
// https://nodejs.org/en/knowledge/getting-started/what-is-require/
// require('webrtc-adapter');
// 
// https://blog.zackad.dev/en/2017/08/19/create-websocket-with-nodejs.html
// 
// https://hackernoon.com/set-up-ssl-in-nodejs-and-express-using-openssl-f2529eab5bb
// https://stackoverflow.com/questions/42918916/npm-install-openssl-failed-on-windows-10
// not great to use someone elses binaries,
// https://wiki.openssl.org/index.php/Binaries
// https://slproweb.com/products/Win32OpenSSL.html


// const clientConnections = new Set();

// const https = require('https');
// const fs = require('fs');

// function reqHandler(req, res) {
// 	console.log(req)
// }

// const server = https.createServer({
// 	key: fs.readFileSync('./key.pem'),
// 	cert: fs.readFileSync('./cert.pem'),
// 	passphrase: 'test'
// }, reqHandler)


// const WebSocket = require('ws');
// // const WebSocket = require('wss');
 
// // const wss = new WebSocket.Server({
// //   port: 8082,
// // });
// // https://stackoverflow.com/questions/46175397/https-server-with-websockets-on-node-js
// const wss = new WebSocket.Server({
//   server,
//   port: 8082,
//   // path: '/ws'
// });

// // console.log('serving WebSocket via', wss, wss.url)
// console.log('serving WebSocket via', wss.address(), wss.url)

// wss.on('close', a => console.log(a));
// wss.on('connection', function connection(ws, req) {
// 	console.log('connected!')

//   ws.on('message', function incoming(message) {

//   	console.log(message);

//     //WHY IS THIS HAPPENING TO ME?!?
//     // let split = message.split(',');
//     // let numberized = split.map(str => parseInt(str, 10))

//     // send_vals(numberized);
//   });
// });
// wss.on('error', err => console.log(err));
// wss.on('headers', (headers, req) => console.log(headers, req));
// wss.on('listening', a => console.log(a, 'listening'));


/*
NOTES:
readFileSync should have some performance overhead versus readFile (async)

*/



{
  const WebSocket = require('ws');
   
  const wss = new WebSocket.Server({
    port: 8082,
  });

  wss.on('connection', function connection(ws) {
    console.log('yes!')
    ws.on('message', function incoming(message) {
      ws.send('pong')
    });
  });
}