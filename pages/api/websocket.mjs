// server.js (Next.js custom server)
import express from 'express';
import { createServer } from 'https';
import { WebSocketServer } from 'ws';
const server = express();
const httpServer = createServer(server);
const wss = new WebSocketServer({ server: httpServer });
import handler from './handler.mjs';
// Handle WebSocket connections
wss.on('connection', function connection(ws) {
  console.log('Client connected');

  ws.on('close', function () {
    console.log('Client disconnected');
  });
});

// Handle incoming webhook events from Sanity.io
server.post('/api/websocket',handler);


httpServer.listen(3000, () => {
  console.log(`Next.js server with WebSocket running on port 3000`);
});
