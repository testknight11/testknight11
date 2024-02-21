import express from 'express';
import sseHandler from './sseHandler'; // Adjust the path as needed

const app = express();

// Route to handle SSE connections
app.get('/api/sseHandler', sseHandler);

// Other server setup code

app.listen(10000, () => {
    console.log(`Server is running on port 10000`);
});