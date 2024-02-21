import express from 'express';
import { sseHandler } from './handler'; // Adjust the path as needed

const app = express();

// Route to handle SSE connections
app.get('/api/sse', sseHandler);

// Other server setup code

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});