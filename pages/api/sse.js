
import { webhookEmitter } from "./handler.js";
console.log('test')
export default function handler(req, res) {


  if (req.headers.accept && req.headers.accept.includes('text/event-stream')) {
    // Set SSE headers

    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    console.log('tesssssssssssssssssssssst')
    // Keep the connection alive
    const intervalId = setInterval(() => {
      res.write(': ping\n\n'); // Send a "ping" event every few seconds to keep the connection alive
    }, 10000);

    const sendEvent = (data) => {
      res.write(`data: ${JSON.stringify(data)}\n\n`);
    };
    console.log('test1')

    // Listen for webhook events
    webhookEmitter.on('webhookReceived', (data) => {
      sendEvent(data);
    });
    console.log('tet2')
    req.socket.on('close', () => {
      clearInterval(intervalId);
      webhookEmitter.off('webhookReceived', sendEvent);
      res.end();
    });
    console.log('tet3')
  } else {
    // Handle requests that don't accept SSE
    console.log('tesssssssssssssssssssssst')
    res.status(400).end();
  }
}

