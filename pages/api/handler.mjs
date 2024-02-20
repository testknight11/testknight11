// webhookHandler.js

export default async function handler(req, res) {
    // Extract the payload from the request body
    const payload = req.body;
  
    // Process the webhook event from Sanity.io
    // For example, you can access specific fields from the payload
    const eventType = payload.eventType;
    const eventData = payload.data;
  
    // Broadcast the event over WebSocket to connected clients
    wss.clients.forEach((client) => {
      if (client.readyState === 1) {
        // Send the relevant information to clients
        client.send(JSON.stringify({ eventType, eventData }));
      }
    });
  
    // Respond to the webhook request with a success message
    res.status(200).json({ message: 'Webhook received successfully' });
  };
  
