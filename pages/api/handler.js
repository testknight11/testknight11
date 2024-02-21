// export default async (req, res) => {
//   try {
//     if (req.method !== "POST") {
//       res.status(405).json({ error: "Method Not Allowed" });
//       return;
//     }

//     // Process the webhook payload
//     const payload = req.body; // Assuming the payload is in the request body

//     // Do something with the payload
//     console.log("Webhook received:", payload);

//     // Return a response (optional)
//     res.status(200).json({ message: "Webhook received successfully!" });
//   } catch (error) {
//     console.error("Webhook error:", error);
//     res
//       .status(500)
//       .json({ error: "An error occurred while processing the webhook." });
//   }
// };



// import {WebSocketServer} from 'ws'; // Import WebSocket library

// // Create a WebSocket server
// const wss = new WebSocketServer({ noServer: true });

// // Handle WebSocket connections
// wss.on('connection', function connection(ws) {
//     console.log('WebSocket client connected.');

//     // You can add additional logic here if needed
// });

// // Handle upgrade request for WebSocket
// export default async (req, res) => {
//     try {
//         if (req.method !== "POST") {
//             res.status(405).json({ error: "Method Not Allowed" });
//             return;
//         }

//         // Process the webhook payload
//         const payload = req.body; // Assuming the payload is in the request body

//         // Do something with the payload
//         console.log("Webhook received:", payload);

//         // Send payload to all connected WebSocket clients
//         wss.clients.forEach(client => {
//             if (client.readyState === 1) {
//                 client.send(JSON.stringify(payload));
//             }
//         });

//         // Return a response (optional)
//         res.status(200).json({ message: "Webhook received successfully!" });
//     } catch (error) {
//         console.error("Webhook error:", error);
//         res.status(500).json({ error: "An error occurred while processing the webhook." });
//     }
// };

// // Export the WebSocket server



// import { EventEmitter } from 'events';

// const webhookEmitter = new EventEmitter();
// webhookEmitter.emit('webhookReceived', 'Initial connection established');
// export default async function handler(req, res) {
//   try {
//     if (req.method !== "POST") {
//       res.status(405).json({ error: "Method Not Allowed" });
//       return;
//     }

//     // Process the webhook payload
//     const payload = req.body; // Assuming the payload is in the request body

//     // Emit an SSE event with the payload data
//     webhookEmitter.emit('webhookReceived', payload);

//     // Return a response (optional)
//     res.status(200).json({ message: "Webhook received successfully!" });
//   } catch (error) {
//     console.error("Webhook error:", error);
//     res.status(500).json({ error: "An error occurred while processing the webhook." });
//   }
// }

// // Function to handle SSE connections
// export const streamEvents = (req, res) => {
//   res.setHeader('Content-Type', 'text/event-stream');
//   res.setHeader('Cache-Control', 'no-cache');
//   res.setHeader('Connection', 'keep-alive');

//   // Function to send SSE events
//   const intervalId = setInterval(() => {
//     res.write(': ping\n\n'); // Send a "ping" event every few seconds to keep the connection alive
//   }, 10000);




//   const sendEvent = (data) => {
//     res.write(`data: ${JSON.stringify(data)}\n\n`);
//   };

//   // Listen for webhook events
//   webhookEmitter.on('webhookReceived', (data) => {
//     sendEvent(data);
//   });

//   // Keep the connection alive

//   // Close the SSE connection when the client disconnects
//   req.socket.on('close', () => {

//       // Clean up resources and stop sending updates when the client disconnects

//       clearInterval(intervalId);

//       res.end();

//     });
// };

// import { EventEmitter } from 'events';

// const webhookEmitter = new EventEmitter();
// webhookEmitter.emit('webhookReceived', 'initial');

// export default function handler(req, res) {
//   try {
//     if (req.method === "POST") {
//       // Process the webhook payload
//       const payload = req.body; // Assuming the payload is in the request body

//       // Emit an SSE event with the payload data
//       webhookEmitter.emit('webhookReceived', payload);
// console.log(payload)
//       // Return a response
//       res.status(200).json({ message: "Webhook received successfully!" });
//     } else if (req.headers.accept && req.headers.accept.includes('text/event-stream')) {
//       // Set SSE headers
//       console.log(req)
//       res.setHeader('Content-Type', 'text/event-stream');
//       res.setHeader('Cache-Control', 'no-cache');
//       res.setHeader('Connection', 'keep-alive');





//       const intervalId = setInterval(() => {
//         res.write(': ping\n\n'); // Send a "ping" event every few seconds to keep the connection alive
//       }, 10000);




//       const sendEvent = (data) => {
//         res.write(`data: ${JSON.stringify(data)}\n\n`);
//       };
//       webhookEmitter.on('webhookReceived', () => {
//             sendEvent(req.body);
//           });
//       // Listen for webhook events





//       req.socket.on('close', () => {

//         // Clean up resources and stop sending updates when the client disconnects

//         clearInterval(intervalId);

//         res.end();

//       });







//       // Handle SSE logic here (if needed)
//     } else {
//       res.status(405).json({ error: "Method Not Allowed" });
//     }
//   } catch (error) {
//     console.error("Webhook error:", error);
//     res.status(500).json({ error: "An error occurred while processing the webhook." });
//   }
// }


import { EventEmitter } from 'events';

export const webhookEmitter = new EventEmitter();



export default function handler(req, res) {
  try {
    if (req.method === "POST") {
      // Process the webhook payload
      const payload = req.body; // Assuming the payload is in the request body

      // Emit an SSE event with the payload data
      webhookEmitter.emit('webhookReceived', payload);

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


export function sseHandler(req, res) {
  console.log(webhookEmitter)
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


// import { EventEmitter } from 'events';

// const webhookEmitter = new EventEmitter();
// let webhookEventTriggered = false; // Initialize the webhookEventTriggered variable

// // Simulate initial webhook event
// webhookEmitter.emit('webhookReceived', 'initial');

// export default function handler(req, res) {
//   try {
//     let payload = null;
//     if (req.method === "POST") {
//       // Process the webhook payload
//       payload = req.body; // Assuming the payload is in the request body

//       // Emit an SSE event with the payload data

//       console.log(payload);

//       webhookEmitter.emit('webhookReceived', payload);
//       // Set SSE headers
//       res.setHeader('Content-Type', 'text/event-stream');
//       res.setHeader('Cache-Control', 'no-cache');
//       res.setHeader('Connection', 'keep-alive');

//       const intervalId = setInterval(() => {
//         res.write(': ping\n\n'); // Send a "ping" event every few seconds to keep the connection alive
//       }, 10000);

//       const sendEvent = (data) => {
//         res.write(`data: ${JSON.stringify(data)}\n\n`);
//       };

//       // Listen for webhook events
//       webhookEmitter.on('webhookReceived', () => {
//         sendEvent(payload);
//       });





//       req.socket.on('close', () => {
//         clearInterval(intervalId);
//         webhookEmitter.off('webhookReceived', sendEvent);
//         res.end();
//       });

//       // Return a response
//       res.status(200).json({ message: "Webhook received successfully!" });

//       // Return a response


//       // Set webhookEventTriggered to true when a POST request is received
//       webhookEventTriggered = true;
//     }
//   } catch (error) {
//     console.error("Webhook error:", error);
//     res.status(500).json({ error: "An error occurred while processing the webhook." });
//   }
// }