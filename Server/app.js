const express = require('express');
const bodyParser = require('body-parser');
const messageRoutes = require('./routes/messages');

const app = express();
const port = 3000;

app.use(bodyParser.json());

// Use routes
app.use('/api', messageRoutes);

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
