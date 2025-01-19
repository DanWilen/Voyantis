const express = require('express');
const bodyParser = require('body-parser');
const messageRoutes = require('./routes/messages');
const queues = require('./db/queues'); // Import shared queues


const app = express();
const port = 3000;

app.use(bodyParser.json());

// Endpoint to get all available queues and their message counts
app.get('/api/queues', (req, res) => {
    const queueSummary = Object.fromEntries(
        Object.entries(queues).map(([queueName, messages]) => [queueName, messages.length])
    );
    res.status(200).send(queueSummary);
});

// Use messages routes
app.use('/api', messageRoutes);

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
