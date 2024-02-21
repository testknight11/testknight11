import { EventEmitter } from '@foxify/events';

// export const webhookEmitter = new EventEmitter();
// webhookEmitter.on('webhookReceived', (payload) => {
//   console.log('Received webhook data:', payload);
//   // Process the payload data here
// });


const webhookEmitter = new EventEmitter();

// Example: Emitting an event


// Example: Listening for an event
webhookEmitter.on('eventName', (data) => {
  console.log('Event received:', data);
});

export default function handler(req, res) {
  try {
    if (req.method === "POST") {
      // Process the webhook payload
     // Assuming the payload is in the request body

      // Emit an SSE event with the payload data

const payload=req.body

      // Emit an SSE event with the payload data
      webhookEmitter.emit('webhookReceived',payload );

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

