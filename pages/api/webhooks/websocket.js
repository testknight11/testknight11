// server.js (Next.js custom server)
const express = require('express');
const https = require('https'); // Corrected module import
const WebSocketServer = require('ws');
const server = express();
const httpServer = https.createServer(server); // Corrected method name
const wss = new WebSocketServer.Server({ server: httpServer });

// Handle WebSocket connections
wss.on('connection', function connection(ws) {
  console.log('Client connected');

  ws.on('close', function () {
    console.log('Client disconnected');
  });
});

// Handle incoming webhook events from Sanity.io
server.post('/api/webhooks/websocket', (req, res) => {

  // Process the webhook event from Sanity.io
  // // Broadcast the event over WebSocket to connected clients
  // console.log('Received webhook event from Sanity.io');

  // // Handle the webhook payload and broadcast to WebSocket clients

  // res.status(200).json({ message: 'Webhook received successfully' });


  wss.clients.forEach((client) => {
    if (client.readyState === 1) { // Corrected typo here
      client.send('Dataset updated'); // You can send any information you want here
    }
  });

});


httpServer.listen(3000, () => {
  console.log(`Next.js server with WebSocket running on port 3000`);
});
