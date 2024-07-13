const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');
const chatRoutes = require('./routes/chatRoutes');
const chatController = require('./controllers/chatController');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static(path.join(__dirname, 'public')));
app.use('/', chatRoutes);

io.on('connection', (socket) => {
    chatController.handleConnection(socket);
});

server.listen(3001, () => {
    console.log('listening on *:3001');
});
