import EventEmitter from 'events';

export const webhookEmitter = new EventEmitter();
webhookEmitter.on('webhookReceived', (payload) => {
  console.log('Received webhook data:', payload);
  // Process the payload data here
});

export default async function handler(req, res) {
  try {
    if (req.method === "POST") {
      // Process the webhook payload
      const payload = req.body; // Assuming the payload is in the request body
      console.log(payload)
      // Emit an SSE event with the payload data
      await processPayload(payload);

      // Emit an SSE event with the payload data
      webhookEmitter.emit('webhookReceived', payload);

      console.log(webhookEmitter);

      console.log(webhookEmitter)

      // Return a success response
      res.status(200).json({ message: 'Webhook received successfully!' });
    } else {
      res.status(405).json({ error: "Method Not Allowed" });
    }
  } catch (error) {
    console.error('Webhook error:', error);
    res.status(500).json({ error: 'An error occurred while processing the webhook.' });
  }
}


async function processPayload(payload) {
  // Perform any asynchronous processing of the payload here
  // For example, you could make database queries or API calls
  
  // This is a placeholder async function, replace it with actual processing
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('Payload processed:', payload);
      resolve();
    }, 1000); // Simulate asynchronous processing with a delay of 1 second
  });
}