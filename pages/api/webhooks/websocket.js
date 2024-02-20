// server.js (Next.js custom server)
const express = require('express');
const https = require('https');
const next = require('next');
const WebSocketServer = require('ws');


const dev = process.env.NODE_ENV
const app = next({ dev });
const handle = app.getRequestHandler();

const server = express();
const httpServer = https.createServer(server); // Create HTTP server using Express app
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
P

const PORT = process.env.PORT || 3001;
httpServer.listen(PORT, () => {
  console.log(`Next.js server with WebSocket running on port ${PORT}`);
});