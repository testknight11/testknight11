import EventEmitter from 'events';

export const webhookEmitter = new EventEmitter();


export default function handler(req, res) {
  try {
    if (req.method === "POST") {
      // Process the webhook payload
      const payload = req.body; // Assuming the payload is in the request body
console.log(payload)
      // Emit an SSE event with the payload data
      webhookEmitter.emit('webhookReceived',payload)

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