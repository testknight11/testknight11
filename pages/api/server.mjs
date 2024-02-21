import express from 'express';
import sseHandler from './pages/api/sse.mjs';
import cors from 'cors';
import EventEmitter from 'events';
import next from 'next';
export const webhookEmitter = new EventEmitter();

// const app = express();


// app.use(cors('*'));

// Route to handle SSE connection
// app.get('http://localhost:10000/api/sse.mjs');



const dev = process.env.NODE_ENV !== 'production';
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();


nextApp.prepare().then(() => {

  const app = express();
  
  // const corsOptions = {
  //   origin: 'http://localhost:3000'// Replace with your client's origin

  // };
  
  // app.use(cors(corsOptions));
  // Define your Express routes here
  app.get('/api/sse', sseHandler);

  // Next.js request handler
  app.all('*', (req, res) => {
    return handle(req, res);
  });

  const PORT = 3000;
  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);

  });
});
// Start the server

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
//   // Start sending mock events after the server starts
//   sendMockEvents();
// });
// const mockEvents = [
//   { id: 1, message: 'Event 1' },
//   { id: 2, message: 'Event 2' },
//   { id: 1, message: 'Event 1' },
//   { id: 2, message: 'Event 2' },  { id: 1, message: 'Event 1' },
//   { id: 2, message: 'Event 2' },  { id: 1, message: 'Event 1' },
//   { id: 2, message: 'Event 2' },  { id: 1, message: 'Event 1' },
//   { id: 2, message: 'Event 2' },  { id: 1, message: 'Event 1' },
//   { id: 2, message: 'Event 2' },  { id: 1, message: 'Event 1' },
//   { id: 2, message: 'Event 2' },  { id: 1, message: 'Event 1' },
//   { id: 2, message: 'Event 2' },  { id: 1, message: 'Event 1' },
//   { id: 2, message: 'Event 2' },  { id: 1, message: 'Event 1' },
//   { id: 2, message: 'Event 2' },  { id: 1, message: 'Event 1' },
//   { id: 2, message: 'Event 2' },  { id: 1, message: 'Event 1' },
//   { id: 2, message: 'Event 2' },  { id: 1, message: 'Event 1' },
//   { id: 2, message: 'Event 2' },  { id: 1, message: 'Event 1' },
//   { id: 2, message: 'Event 2' },  { id: 1, message: 'Event 1' },
//   { id: 2, message: 'Event 2' },  { id: 1, message: 'Event 1' },
//   { id: 2, message: 'Event 2' },  { id: 1, message: 'Event 1' },
//   { id: 2, message: 'Event 2' },  { id: 1, message: 'Event 1' },
//   { id: 2, message: 'Event 2' },  { id: 1, message: 'Event 1' },
//   { id: 2, message: 'Event 2' },  { id: 1, message: 'Event 1' },
//   { id: 2, message: 'Event 2' },  { id: 1, message: 'Event 1' },
//   { id: 2, message: 'Event 2' },  { id: 1, message: 'Event 1' },
//   { id: 2, message: 'Event 2' },  { id: 1, message: 'Event 1' },
//   { id: 2, message: 'Event 2' },  { id: 1, message: 'Event 1' },
//   { id: 2, message: 'Event 2' },  { id: 1, message: 'Event 1' },
//   { id: 2, message: 'Event 2' },  { id: 1, message: 'Event 1' },
//   { id: 2, message: 'Event 2' },  { id: 1, message: 'Event 1' },
//   { id: 2, message: 'Event 2' },  { id: 1, message: 'Event 1' },
//   { id: 2, message: 'Event 2' },  { id: 1, message: 'Event 1' },
//   { id: 2, message: 'Event 2' },  { id: 1, message: 'Event 1' },
//   { id: 2, message: 'Event 2' },  { id: 1, message: 'Event 1' },
//   { id: 2, message: 'Event 2' },  { id: 1, message: 'Event 1' },
//   { id: 2, message: 'Event 2' },  { id: 1, message: 'Event 1' },
//   { id: 2, message: 'Event 2' },  { id: 1, message: 'Event 1' },
//   { id: 2, message: 'Event 2' },  { id: 1, message: 'Event 1' },
//   { id: 2, message: 'Event 2' },  { id: 1, message: 'Event 1' },
//   { id: 2, message: 'Event 2' },  { id: 1, message: 'Event 1' },
//   { id: 2, message: 'Event 2' },  { id: 1, message: 'Event 1' },
//   { id: 2, message: 'Event 2' },  { id: 1, message: 'Event 1' },
//   { id: 2, message: 'Event 2' },  { id: 1, message: 'Event 1' },
//   { id: 2, message: 'Event 2' },  { id: 1, message: 'Event 1' },
//   { id: 2, message: 'Event 2' },  { id: 1, message: 'Event 1' },
//   { id: 2, message: 'Event 2' },  { id: 1, message: 'Event 1' },
//   { id: 2, message: 'Event 2' },  { id: 1, message: 'Event 1' },
//   { id: 2, message: 'Event 2' },  { id: 1, message: 'Event 1' },
//   { id: 2, message: 'Event 2' },  { id: 1, message: 'Event 1' },
//   { id: 2, message: 'Event 2' },  { id: 1, message: 'Event 1' },
//   { id: 2, message: 'Event 2' },  { id: 1, message: 'Event 1' },
//   { id: 2, message: 'Event 2' },  { id: 1, message: 'Event 1' },
//   { id: 2, message: 'Event 2' },  { id: 1, message: 'Event 1' },
//   { id: 2, message: 'Event 2' },  { id: 1, message: 'Event 1' },
//   { id: 2, message: 'Event 2' },  { id: 1, message: 'Event 1' },
//   { id: 2, message: 'Event 2' },  { id: 1, message: 'Event 1' },
//   { id: 2, message: 'Event 2' },  { id: 1, message: 'Event 1' },
//   { id: 2, message: 'Event 2' },  { id: 1, message: 'Event 1' },
//   { id: 2, message: 'Event 2' },  { id: 1, message: 'Event 1' },
//   { id: 2, message: 'Event 2' },  { id: 1, message: 'Event 1' },
//   { id: 2, message: 'Event 2' },  { id: 1, message: 'Event 1' },
//   { id: 2, message: 'Event 2' },  { id: 1, message: 'Event 1' },
//   { id: 2, message: 'Event 2' },  { id: 1, message: 'Event 1' },
//   { id: 2, message: 'Event 2' },  { id: 1, message: 'Event 1' },
//   { id: 2, message: 'Event 2' },  { id: 1, message: 'Event 1' },
//   { id: 2, message: 'Event 2' },  { id: 1, message: 'Event 1' },
//   { id: 2, message: 'Event 2' },  { id: 1, message: 'Event 1' },
//   { id: 2, message: 'Event 2' },  { id: 1, message: 'Event 1' },
//   { id: 2, message: 'Event 2' },  { id: 1, message: 'Event 1' },
//   { id: 2, message: 'Event 2' },  { id: 1, message: 'Event 1' },
//   { id: 2, message: 'Event 2' },  { id: 1, message: 'Event 1' },
//   { id: 2, message: 'Event 2' },  { id: 1, message: 'Event 1' },
//   { id: 2, message: 'Event 2' },  { id: 1, message: 'Event 1' },
//   { id: 2, message: 'Event 2' },  { id: 1, message: 'Event 1' },
//   { id: 2, message: 'Event 2' },  { id: 1, message: 'Event 1' },
//   { id: 2, message: 'Event 2' },  { id: 1, message: 'Event 1' },
//   { id: 2, message: 'Event 2' },  { id: 1, message: 'Event 1' },
//   { id: 2, message: 'Event 2' },  { id: 1, message: 'Event 1' },
//   { id: 2, message: 'Event 2' },  { id: 1, message: 'Event 1' },
//   { id: 2, message: 'Event 2' },  { id: 1, message: 'Event 1' },
//   { id: 2, message: 'Event 2' },  { id: 1, message: 'Event 1' },
//   { id: 2, message: 'Event 2' },  { id: 1, message: 'Event 1' },
//   { id: 2, message: 'Event 2' },  { id: 1, message: 'Event 1' },
//   { id: 2, message: 'Event 2' },  { id: 1, message: 'Event 1' },
//   { id: 2, message: 'Event 2' },  { id: 1, message: 'Event 1' },
//   { id: 2, message: 'Event 2' },  { id: 1, message: 'Event 1' },
//   { id: 2, message: 'Event 2' },  { id: 1, message: 'Event 1' },
//   { id: 2, message: 'Event 2' },  { id: 1, message: 'Event 1' },
//   { id: 2, message: 'Event 2' },  { id: 1, message: 'Event 1' },
//   { id: 2, message: 'Event 2' },  { id: 1, message: 'Event 1' },
//   { id: 2, message: 'Event 2' },  { id: 1, message: 'Event 1' },
//   { id: 2, message: 'Event 2' },  { id: 1, message: 'Event 1' },
//   { id: 2, message: 'Event 2' },  { id: 1, message: 'Event 1' },
//   { id: 2, message: 'Event 2' },  { id: 1, message: 'Event 1' },
//   { id: 2, message: 'Event 2' },  { id: 1, message: 'Event 1' },
//   { id: 2, message: 'Event 2' },  { id: 1, message: 'Event 1' },
//   { id: 2, message: 'Event 2' },  { id: 1, message: 'Event 1' },
//   { id: 2, message: 'Event 2' },  { id: 1, message: 'Event 1' },
//   { id: 2, message: 'Event 2' },  { id: 1, message: 'Event 1' },
//   { id: 2, message: 'Event 2' },  { id: 1, message: 'Event 1' },
//   { id: 2, message: 'Event 2' },  { id: 1, message: 'Event 1' },
//   { id: 2, message: 'Event 2' },  { id: 1, message: 'Event 1' },
//   { id: 2, message: 'Event 2' },  { id: 1, message: 'Event 1' },
//   { id: 2, message: 'Event 2' },  { id: 1, message: 'Event 1' },
//   { id: 2, message: 'Event 2' },  { id: 1, message: 'Event 1' },
//   { id: 2, message: 'Event 2' },  { id: 1, message: 'Event 1' },
//   { id: 2, message: 'Event 2' },  { id: 1, message: 'Event 1' },
//   { id: 2, message: 'Event 2' },  { id: 1, message: 'Event 1' },
//   { id: 2, message: 'Event 2' },  { id: 1, message: 'Event 1' },
//   { id: 2, message: 'Event 2' },  { id: 1, message: 'Event 1' },
//   { id: 2, message: 'Event 2' },  { id: 1, message: 'Event 1' },
//   { id: 2, message: 'Event 2' },  { id: 1, message: 'Event 1' },
//   { id: 2, message: 'Event 2' },  { id: 1, message: 'Event 1' },
//   { id: 2, message: 'Event 2' },  { id: 1, message: 'Event 1' },
//   { id: 2, message: 'Event 2' },  { id: 1, message: 'Event 1' },
//   { id: 2, message: 'Event 2' },  { id: 1, message: 'Event 1' },
//   { id: 2, message: 'Event 2' },  { id: 1, message: 'Event 1' },
//   { id: 2, message: 'Event 2' },  { id: 1, message: 'Event 1' },
//   { id: 2, message: 'Event 2' },  { id: 1, message: 'Event 1' },
//   { id: 2, message: 'Event 2' },  { id: 1, message: 'Event 1' },
//   { id: 2, message: 'Event 2' },  { id: 1, message: 'Event 1' },
//   { id: 2, message: 'Event 2' },  { id: 1, message: 'Event 1' },
//   { id: 2, message: 'Event 2' },  { id: 1, message: 'Event 1' },
//   { id: 2, message: 'Event 2' },  { id: 1, message: 'Event 1' },
//   { id: 2, message: 'Event 2' },  { id: 1, message: 'Event 1' },
//   { id: 2, message: 'Event 2' },  { id: 1, message: 'Event 1' },
//   { id: 2, message: 'Event 2' },  { id: 1, message: 'Event 1' },
//   { id: 2, message: 'Event 2' },  { id: 1, message: 'Event 1' },
//   { id: 2, message: 'Event 2' },  { id: 1, message: 'Event 1' },
//   { id: 2, message: 'Event 2' },  { id: 1, message: 'Event 1' },
//   { id: 2, message: 'Event 2' },  { id: 1, message: 'Event 1' },
//   { id: 2, message: 'Event 2' },  { id: 1, message: 'Event 1' },
//   { id: 2, message: 'Event 2' },  { id: 1, message: 'Event 1' },
//   { id: 2, message: 'Event 2' },  { id: 1, message: 'Event 1' },
//   { id: 2, message: 'Event 2' },  { id: 1, message: 'Event 1' },
//   { id: 2, message: 'Event 2' },  { id: 1, message: 'Event 1' },
//   { id: 2, message: 'Event 2' },  { id: 1, message: 'Event 1' },
//   { id: 2, message: 'Event 2' },  { id: 1, message: 'Event 1' },
//   { id: 2, message: 'Event 2' },  { id: 1, message: 'Event 1' },
//   { id: 2, message: 'Event 2' },  { id: 1, message: 'Event 1' },
//   { id: 2, message: 'Event 2' },  { id: 1, message: 'Event 1' },
//   { id: 2, message: 'Event 2' },  { id: 1, message: 'Event 1' },
//   { id: 2, message: 'Event 2' },  { id: 1, message: 'Event 1' },
//   { id: 2, message: 'Event 2' },  { id: 1, message: 'Event 1' },
//   { id: 2, message: 'Event 2' },  { id: 1, message: 'Event 1' },
//   { id: 2, message: 'Event 2' },  { id: 1, message: 'Event 1' },
//   { id: 2, message: 'Event 2' },  { id: 1, message: 'Event 1' },
//   { id: 2, message: 'Event 2' },  { id: 1, message: 'Event 1' },
//   { id: 2, message: 'Event 2' },  { id: 1, message: 'Event 1' },
//   { id: 2, message: 'Event 2' },  { id: 1, message: 'Event 1' },
//   { id: 2, message: 'Event 2' },  { id: 1, message: 'Event 1' },
//   { id: 2, message: 'Event 2' },  { id: 1, message: 'Event 1' },
//   { id: 2, message: 'Event 2' },  { id: 1, message: 'Event 1' },
//   { id: 2, message: 'Event 2' },  { id: 1, message: 'Event 1' },
//   { id: 2, message: 'Event 2' },  { id: 1, message: 'Event 1' },
//   { id: 2, message: 'Event 2' },  { id: 1, message: 'Event 1' },
//   { id: 2, message: 'Event 2' },  { id: 1, message: 'Event 1' },
//   { id: 2, message: 'Event 2' },  { id: 1, message: 'Event 1' },
//   { id: 2, message: 'Event 2' },  { id: 1, message: 'Event 1' },
//   { id: 2, message: 'Event 2' },  { id: 1, message: 'Event 1' },
//   { id: 2, message: 'Event 2' },  { id: 1, message: 'Event 1' },
//   { id: 2, message: 'Event 2' },  { id: 1, message: 'Event 1' },
//   { id: 2, message: 'Event 2' },  { id: 1, message: 'Event 1' },
//   { id: 2, message: 'Event 2' },  { id: 1, message: 'Event 1' },
//   { id: 2, message: 'Event 2' },  { id: 1, message: 'Event 1' },
//   { id: 2, message: 'Event 2' },  { id: 1, message: 'Event 1' },
//   { id: 2, message: 'Event 2' },  { id: 1, message: 'Event 1' },
//   { id: 2, message: 'Event 2' },  { id: 1, message: 'Event 1' },
//   { id: 2, message: 'Event 2' },  { id: 1, message: 'Event 1' },
//   { id: 2, message: 'Event 2' },  { id: 1, message: 'Event 1' },
//   { id: 2, message: 'Event 2' },  { id: 1, message: 'Event 1' },
//   { id: 2, message: 'Event 2' },  { id: 1, message: 'Event 1' },
//   { id: 2, message: 'Event 2' },  { id: 1, message: 'Event 1' },
//   { id: 2, message: 'Event 2' },  { id: 1, message: 'Event 1' },
//   { id: 2, message: 'Event 2' },  { id: 1, message: 'Event 1' },
//   { id: 2, message: 'Event 2' },  { id: 1, message: 'Event 1' },
//   { id: 2, message: 'Event 2' },  { id: 1, message: 'Event 1' },
//   { id: 2, message: 'Event 2' },  { id: 1, message: 'Event 1' },
//   { id: 2, message: 'Event 2' },  { id: 1, message: 'Event 1' },
//   { id: 2, message: 'Event 2' },  { id: 1, message: 'Event 1' },
//   { id: 2, message: 'Event 2' },  { id: 1, message: 'Event 1' },
//   { id: 2, message: 'Event 2' },  { id: 1, message: 'Event 1' },
//   { id: 2, message: 'Event 2' },  { id: 1, message: 'Event 1' },
//   { id: 2, message: 'Event 2' },
//   // Add more mock events as needed
// ];

// let eventIndex = 0;

// function mockEmit(event,payload) {
//   // Emit the specified event with the provided data
//   webhookEmitter.emit(event,payload);
//   // console.log(webhookEmitter)
// }

// // Function to simulate sending events at regular intervals
// export function sendMockEvents() {
//   setInterval(() => {
//     const event = mockEvents[eventIndex];
//     mockEmit('webhookReceived',event);
//     eventIndex = (eventIndex + 1) % mockEvents.length;

//   }, 5000); // Send an event every 5 seconds
// }



// Route to handle SSE connection

// Start the server

