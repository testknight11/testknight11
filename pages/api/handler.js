

// export const webhookEmitter = new EventEmitter();
// webhookEmitter.on('webhookReceived', (payload) => {
//   console.log('Received webhook data:', payload);
//   // Process the payload data here
// });


import { EventEmitter } from "@foxify/events";
// Example: Listening for an event
let heldRes; // Global or class-level reference to hold the response object
const webhookEmitter = new EventEmitter()

webhookEmitter.on('webhookReceived', (data) => { // Listen for the webhookReceived event
  console.log('webhook data received', data)
});

export default async function handler(req, res) {

  try {
    console.log(req.method)
    if (req.method === 'GET') {

      res.setHeader('Content-Type', 'text/event-stream');
      res.setHeader('Cache-Control', 'no-cache');
      res.setHeader('Connection', 'keep-alive');
      res.setHeader('X-Accel-Buffering', 'no'); // Disable proxy/web server buffering
      res.setHeader('Access-Control-Allow-Origin', '*');

      // res.writeHead(200, {
      //   'Content-Type': 'text/event-stream',
      //   'Cache-Control': 'no-cache',
      //   'Connection': 'keep-alive',
      //   'Access-Control-Allow-Origin': '*'
      // })




      try {
        if (req.method === 'GET') {
          res.setHeader('Content-Type', 'text/event-stream');
          // ... other headers

          heldRes = res; // Store the response object for later use

          const intervalId = setInterval(() => {
            if (heldRes) { // Check if the response object is still available
              heldRes.write(': ping\n\n'); // Send ping events
            }
          }, 10000);

          webhookEmitter.on('webhookReceived', (data) => {
            const sseEvent = { event: 'my-event', data : data};

            if (heldRes) {
              heldRes.write(`${JSON.stringify(sseEvent)}\n\n`, (error) => {
                if (error) {
                  // Handle specific errors or provide more informative messages
                  console.error('Error sending SSE data:', error);
                }
              });
            }
          });

          req.socket.on('close', () => {
            clearInterval(intervalId);
            if (heldRes) {
              heldRes.end(); // Close the response when the socket closes
              heldRes = null; // Clear the reference
            }
          });
        }
      } catch (error) {
        // Handle any errors that occur during the request handling
        console.error('Error in request handler:', error);
        res.status(500).send('Internal server error');
      }

    }
    else if (req.method === 'POST') {


      const payload = req.body




      // Example: Emitting an event
      webhookEmitter.emit('webhookReceived', payload); // Emit the webhookReceived event with the payload

      console.log('tet2')


      // Process the webhook payload
      // Assuming the payload is in the request body



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

