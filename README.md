Project Overview

This project consists of two components:

Server: A Node.js-based REST API to manage message queues.

Client: A React-based web application to interact with the server.

Both components work together to provide a full-stack solution for managing and visualizing queues and their messages.

How to Initialize the Server

Prerequisites

Node.js installed on your system.

Steps to Run the Server

Navigate to the server directory in your terminal:

cd /path/to/server

Install dependencies:

npm install

Start the server:

node app.js

The server will start on port 3000 by default. You should see a message:

Server is running on http://localhost:3000

Server Endpoints

GET /api/queues: Retrieves all available queues and their message counts.

POST /api/{queue_name}: Adds a message to the specified queue.

GET /api/{queue_name}?timeout={ms}: Retrieves the next message from the specified queue.

How to Initialize the Client

Prerequisites

Node.js installed on your system.

Steps to Run the Client

Navigate to the client directory in your terminal:

cd /path/to/client

Install dependencies:

npm install

Start the client:

npm start

The client will start on port 8000 by default (or 8000 if specified in the .env file). Open your browser and navigate to:

http://localhost:8000

Directory Structure

Server

server/
├── app.js               # Main server file
├── routes/
│   └── messages.js      # Route handlers for API endpoints
├── db/queues.js            # Shared queue object
├── package.json         # Server dependencies
└── ...

Client

client/
├── src/
│   ├── App.js           # Main React component
│   ├── index.js         # React entry point
│   └── ...
├── .env                 # Environment variables
├── package.json         # Client dependencies
└── ...

Notes

Ensure both the server and client are running simultaneously to interact with the application.

The server and client communicate via REST API endpoints.

Customize the ports as needed using .env files or command-line arguments.

For any issues or troubleshooting, feel free to reach out!

