// server.js (Next.js custom server)
const express = require('express');
const https = require('https'); // Corrected module import
const WebSocketServer = require('ws');
const server = express();
const httpServer = https.createServer(server); // Corrected method name
const wss = new WebSocketServer.Server({ server: httpServer });
const handler = require('./handler'); // Import the webhook handler function
// Handle WebSocket connections
wss.on('connection', function connection(ws) {
  console.log('Client connected');

  ws.on('close', function () {
    console.log('Client disconnected');
  });
});

// Handle incoming webhook events from Sanity.io
server.post('/api/webhooks/websocket',handler);


httpServer.listen(3000, () => {
  console.log(`Next.js server with WebSocket running on port 3000`);
});
