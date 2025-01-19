import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Typography, Select, MenuItem, Button, Card, CardContent } from '@mui/material';

const API_BASE_URL = 'http://localhost:3000/api'; // Change if your API is hosted elsewhere

function App() {
    const [queues, setQueues] = useState({});
    const [selectedQueue, setSelectedQueue] = useState('');
    const [message, setMessage] = useState(null);

    // Fetch queues and their message counts
    useEffect(() => {
        const fetchQueues = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/queues`);
                console.log(response)
                setQueues(response.data);
            } catch (error) {
                console.error('Error fetching queues:', error);
            }
        };
        fetchQueues();
    }, []);

    // Handle 'Go' button click
    const fetchMessage = async () => {
        if (!selectedQueue) return;

        try {
            const response = await axios.get(`${API_BASE_URL}/${selectedQueue}`);
            setMessage(response.data || 'No message available.');
        } catch (error) {
            console.error('Error fetching message:', error);
            setMessage('Error retrieving message.');
        }
    };

    return (
        <Container maxWidth="md" style={{ padding: '20px' }}>
            <Typography variant="h4" align="center" gutterBottom style={{ color: '#0056d6' }}>
                Queue Management System
            </Typography>

            <Card style={{ marginBottom: '20px', padding: '20px', boxShadow: '0px 4px 6px rgba(0,0,0,0.1)' }}>
                <Typography variant="h6">Available Queues:</Typography>
                {Object.keys(queues).length > 0 ? (
                    <ul>
                        {Object.entries(queues).map(([queue, count]) => (
                            <li key={queue}>
                                {queue}: {count} message(s)
                            </li>
                        ))}
                    </ul>
                ) : (
                    <Typography>No queues available.</Typography>
                )}
            </Card>

            <Card style={{ marginBottom: '20px', padding: '20px', boxShadow: '0px 4px 6px rgba(0,0,0,0.1)' }}>
                <Typography variant="h6" gutterBottom>
                    Select a Queue:
                </Typography>
                <Select
                    value={selectedQueue}
                    onChange={(e) => setSelectedQueue(e.target.value)}
                    displayEmpty
                    style={{ marginBottom: '10px', minWidth: '200px' }}
                >
                    <MenuItem value="" disabled>
                        Select a queue
                    </MenuItem>
                    {Object.keys(queues).map((queue) => (
                        <MenuItem key={queue} value={queue}>
                            {queue}
                        </MenuItem>
                    ))}
                </Select>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={fetchMessage}
                    style={{ backgroundColor: '#0056d6', color: '#fff' }}
                >
                    Go
                </Button>
            </Card>

            {message && (
                <Card style={{ padding: '20px', boxShadow: '0px 4px 6px rgba(0,0,0,0.1)' }}>
                    <Typography variant="h6">Message:</Typography>
                    <Typography>{typeof message === 'object' ? JSON.stringify(message) : message}</Typography>
                </Card>
            )}
        </Container>
    );
}

export default App;
