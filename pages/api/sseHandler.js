



export default function sseHandler(req, res) {
  if (webhookEmitter.listenerCount('webhookReceived') > 0 && payload !== null) {
    if (req.headers.accept && req.headers.accept.includes('text/event-stream')) {
      // Set SSE headers
      res.setHeader('Content-Type', 'text/event-stream');
      res.setHeader('Cache-Control', 'no-cache');
      res.setHeader('Connection', 'keep-alive');

      // Keep the connection alive
      const intervalId = setInterval(() => {
        res.write(': ping\n\n'); // Send a "ping" event every few seconds to keep the connection alive
      }, 10000);

      const sendEvent = (data) => {
        res.write(`data: ${JSON.stringify(data)}\n\n`);
      };

      // Listen for webhook events
      webhookEmitter.on('webhookReceived', (data) => {
        sendEvent(data);
        console.log(webhookEmitter)
      });

      req.socket.on('close', () => {
        clearInterval(intervalId);
        webhookEmitter.off('webhookReceived', sendEvent);
        res.end();
      });
    } else {
      // Handle requests that don't accept SSE
      res.status(400).end();
    }
  }
}
