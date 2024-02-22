import { EventEmitter } from '@foxify/events';

// export const webhookEmitter = new EventEmitter();
// webhookEmitter.on('webhookReceived', (payload) => {
//   console.log('Received webhook data:', payload);
//   // Process the payload data here
// });



// Example: Listening for an event
export const webhookEmitter = new EventEmitter();


export default async function handler(req, res) {

  try {
    console.log(req.method)
    if (req.method === 'POST') {


      const payload = req.body
      webhookEmitter.on('webhookReceived', (payload) => {
        // Process the payload data here
        console.log('Received webhook data inside handler:', payload);
      });
      webhookEmitter.emit('webhookReceived', {id:1,msg:'test'});

      // Example: Emitting an event




      console.log(webhookEmitter('webhookReceived'))
      // Process the webhook payload
      // Assuming the payload is in the request body
      console.log('test payload', payload)


      // Emit an SSE event with the payload data


      // Emit an SSE event with the payload data



      // Set SSE headers


      // Listen for webhook events

      console.log('test1')

      // Return a success response
     await res.status(200).json({ message: 'Webhook received test successfully!' });

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

console.log(webhookEmitter)