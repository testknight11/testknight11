export default async (req, res) => {
  try {
    if (req.method !== "POST") {
      res.status(405).json({ error: "Method Not Allowed" });
      return;
    }

    // Process the webhook payload
    const payload = req.body; // Assuming the payload is in the request body

    // Do something with the payload
    console.log("Webhook received:", payload);

    // Return a response (optional)
    res.status(200).json({ message: "Webhook received successfully!" });
  } catch (error) {
    console.error("Webhook error:", error);
    res
      .status(500)
      .json({ error: "An error occurred while processing the webhook." });
  }
};



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
