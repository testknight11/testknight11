// // server.js (Next.js custom server)
// import express from 'express';
// import { createServer } from 'https';
// import { WebSocketServer } from 'ws';
// const server = express();
// const httpServer = createServer(server);
// const wss = new WebSocketServer({ server: httpServer });
// import handler from './handler.mjs';
// // Handle WebSocket connections
// wss.on('connection', function connection(ws) {
//   console.log('Client connected');

//   ws.on('close', function () {
//     console.log('Client disconnected');
//   });
// });

// // Handle incoming webhook events from Sanity.io
// server.post('/api/websocket',handler);


// httpServer.listen(3000, () => {
//   console.log(`Next.js server with WebSocket running on port 3000`);
// });


const express = require('express');
const app = express();

// Route handler for the webhook endpoint
app.post('/api/websocket', (req, res) => {
  // Parse the incoming request body (if applicable)
  const requestData = req.body;

  // Handle the webhook request
  // Process requestData, perform actions, etc.

  // Send a response back to the sender
  res.status(200).json({ message: 'Webhook received successfully' });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});