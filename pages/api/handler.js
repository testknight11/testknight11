import { EventEmitter } from '@foxify/events';

// export const webhookEmitter = new EventEmitter();
// webhookEmitter.on('webhookReceived', (payload) => {
//   console.log('Received webhook data:', payload);
//   // Process the payload data here
// });


const webhookEmitter = new EventEmitter();
webhookEmitter.on('webhookReceived', (payload) => {
  console.log('Received webhook data:', payload);
  // Process the payload data here
});
let payload;

// Example: Emitting an event


// Example: Listening for an event


export default async function handler(req, res) {
  try {
    if (req.method === "POST") {
      // Process the webhook payload
      // Assuming the payload is in the request body

      // Emit an SSE event with the payload data
      payload = req.body;


      // Emit an SSE event with the payload data



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


// async function processPayload(payload) {
//   // Perform any asynchronous processing of the payload here
//   // For example, you could make database queries or API calls

//   // This is a placeholder async function, replace it with actual processing
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       console.log('Payload processed:', payload);

//       resolve();
//     }, 3000); // Simulate asynchronous processing with a delay of 1 second
//   });
// }
console.log(payload)
webhookEmitter.emit('webhookReceived', payload);
console.log(webhookEmitter)