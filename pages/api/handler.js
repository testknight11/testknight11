



import { EventEmitter } from "@foxify/events";
// Example: Listening for an event

const webhookEmitter = new EventEmitter()
const queuedData = [];
webhookEmitter.on('webhookReceived', (data) => {
  queuedData.push(data);
  console.log('data pushed', data)
});

setInterval(() => {
  if (queuedData.length > 0) {
    const sseEvent = {
      event: 'my-event',
      data: queuedData.shift() // Take the first element from the queue
    };
    res.write(`${JSON.stringify(sseEvent)}\n\n`);
  }
}, 1000); // Check for new data every second


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





      // const intervalId = setInterval(() => {
      //   res.write(': ping\n\n'); // Send a "ping" event every few seconds to keep the connection alive
      // }, 10000);
      console.log('test65')



      console.log('test1')
      // webhookEmitter.on('webhookReceived', (data) => { // Listen for the webhookReceived event
      //   const sseEvent = {
      //     event: 'my-event', // Your desired event name
      //     data: data // Or processed data
      //   };
      //   console.log('sdtat or not data', data)
      //   res.write(`${JSON.stringify(sseEvent)}\n\n`, (error) => {

      //     console.error('Error sending SSE data:', error); // Log any errors that occur during writing
      //   });

      //   console.log('data emited finallyyyyyyy')
      // });
      // Example: Emitting an event
      // webhookEmitter.emit('webhookReceived', payload); // Emit the webhookReceived event with the payload
      // console.log('tet2')
      // req.socket.on('close', () => {
      //   clearInterval(intervalId);
      //   res.end();
      // });
      // console.log('tet3')

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

