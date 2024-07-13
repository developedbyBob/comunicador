const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

const rooms = {};

io.on('connection', (socket) => {
    console.log('a user connected');
    
    socket.on('join', (room) => {
        if (!rooms[room]) {
            rooms[room] = [];
        }
        rooms[room].push(socket.id);
        socket.join(room);
        socket.room = room;
        
        const otherUsers = rooms[room].filter(id => id !== socket.id);
        socket.emit('all-users', otherUsers);
    });

    socket.on('signal', (data) => {
        const { signal, to } = data;
        io.to(to).emit('signal', { signal, from: socket.id });
    });

    socket.on('disconnect', () => {
        const room = socket.room;
        if (room) {
            rooms[room] = rooms[room].filter(id => id !== socket.id);
            if (rooms[room].length === 0) {
                delete rooms[room];
            }
        }
    });
});

server.listen(3000, () => {
    console.log('listening on *:3000');
});
