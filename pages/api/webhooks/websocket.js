// server.js (Next.js custom server)
const express = require('express');
const http = require('http');
const next = require('next');
const WebSocketServer = require('ws');


const dev = process.env.NODE_ENV
const app = next({ dev });


const server = express();
const httpServer = http.createServer(server); // Create HTTP server using Express app
const wss = new WebSocketServer.Server({ server: httpServer });

// Handle WebSocket connections
wss.on('connection', function connection(ws) {
  console.log('Client connected');

  ws.on('close', function () {
    console.log('Client disconnected');
  });
});

// Handle incoming webhook events from Sanity.io

httpServer.listen(3000, () => {
  console.log(`Next.js server with WebSocket running on port 3000`);
});