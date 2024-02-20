
import { EventEmitter } from 'events';

const webhookEmitter = new EventEmitter();

export default async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      res.status(405).json({ error: "Method Not Allowed" });
      return;
    }

    // Process the webhook payload
    const payload = req.body; // Assuming the payload is in the request body

    // Emit an SSE event with the payload data
    webhookEmitter.emit('webhookReceived', payload);

    // Return a response (optional)
    res.status(200).json({ message: "Webhook received successfully!" });
  } catch (error) {
    console.error("Webhook error:", error);
    res.status(500).json({ error: "An error occurred while processing the webhook." });
  }
}

// Function to handle SSE connections
export const streamEvents = (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  // Function to send SSE events
  const sendEvent = (data) => {
    res.write(`data: ${JSON.stringify(data)}\n\n`);
  };

  // Listen for webhook events
  webhookEmitter.on('webhookReceived', (data) => {
    sendEvent(data);
  });

  // Keep the connection alive
  const intervalId = setInterval(() => {
    res.write(': ping\n\n'); // Send a "ping" event every few seconds to keep the connection alive
  }, 10000);

  // Close the SSE connection when the client disconnects
  req.on('close', () => {
    clearInterval(intervalId); // Clear the interval
    webhookEmitter.off('webhookReceived', sendEvent); // Remove the event listener
    res.end(); // End the response
  });
};