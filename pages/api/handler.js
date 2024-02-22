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

    if (req.method === "POST") {

    
      const payload = req.body

      // Example: Emitting an event
      webhookEmitter.on('webhookReceived', (payload) => {
        // Process the payload data here
        console.log('Received webhook data inside handler:', payload);
      });

      webhookEmitter.emit('webhookReceived', payload);
      // Process the webhook payload
      // Assuming the payload is in the request body
console.log('test payload',payload)

      // Emit an SSE event with the payload data


      // Emit an SSE event with the payload data



      // Return a success response
      await res.status(200).json({ message: 'Webhook received test successfully!' });
    } else {

      if (webhookEmitter) {
        console.log('get', webhookEmitter)
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
