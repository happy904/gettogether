const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const app = express();
const PORT = process.env.PORT || 3002;

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/chatboot.html');
});

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
    console.log('Client connected');

    ws.on('message', (message) => {
        const messageString = message.toString();
        console.log('Received:', messageString);
        // Broadcast to all clients
        wss.clients.forEach((client) => {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(messageString);
            }
        });
    });

    ws.on('close', () => {
        console.log('Client disconnected');
    });
});

server.listen(PORT, '192.168.0.208', () => {
    console.log(`Server is running on http://192.168.0.208:${PORT}`);
});
