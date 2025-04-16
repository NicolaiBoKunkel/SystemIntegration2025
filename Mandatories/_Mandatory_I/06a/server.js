//06a [Individual] WebSocket Example
const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', function connection(ws) {
  console.log('New client connected. Total:', wss.clients.size);

  ws.send('Welcome to the chat!');

  ws.on('message', function incoming(message) {
    console.log('Received:', message);

    wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(`${message}`);
      }
    });
  });

  ws.on('close', () => {
    console.log('Client disconnected. Remaining:', wss.clients.size);
  });
});
