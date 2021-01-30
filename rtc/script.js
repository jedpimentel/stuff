
window.onload = function() {

  // Get references to elements on the page.
  const form = document.getElementById('message-form');

  var socket = new WebSocket(`wss://${location.hostname}:8082/`);//TODO: use server IP (programmatically)

  socket.onerror = function(error) {
    console.log('WebSocket Error: ', error);
  };
  socket.onopen = function(event) {
    console.log('opened socket')
    console.log('Connected to: ' + event.currentTarget.url);

  };


  // Handle messages sent by the server.
  socket.onmessage = function(event) {
    console.log('message', event)
  };
  // Show a disconnected message when the WebSocket is closed.
  socket.onclose = function(event) {
    console.log('close', event)
  };

};