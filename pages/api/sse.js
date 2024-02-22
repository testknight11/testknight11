
import { webhookEmitter } from "./handler";
export default function handler(req, res) {






        if (req.headers.accept && req.headers.accept.includes('text/event-stream')) {
          // Set SSE headers
  
          res.setHeader('Content-Type', 'text/event-stream');
          res.setHeader('Cache-Control', 'no-cache');
          res.setHeader('Connection', 'keep-alive');
          res.setHeader('X-Accel-Buffering', 'no'); // Disable proxy/web server buffering
          res.setHeader('Access-Control-Allow-Origin', '*');
          // Keep the connection alive
  
  
          // Listen for webhook events
          const intervalId = setInterval(() => {
            res.write(': ping\n\n'); // Send a "ping" event every few seconds to keep the connection alive
          }, 1000);
          console.log('test65')
  

  

          console.log('test1')
  
       
          console.log('tet2')
          req.socket.on('close', () => {
            clearInterval(intervalId);
            res.end();
          });
          console.log('tet3')
  
  
  
        } else {
          // Handle requests that don't accept SSE
          console.log('tesssssssssssssssssssssst 400')
          res.status(400).end();
        }
  
      
}

