const chatModel = require('../models/chatModel');

const handleConnection = (socket) => {
    console.log('a user connected');

    socket.on('join', (room) => {
        chatModel.addUserToRoom(room, socket.id);
        socket.join(room);
        socket.room = room;

        const otherUsers = chatModel.getOtherUsersInRoom(room, socket.id);
        socket.emit('all-users', otherUsers);
    });

    socket.on('signal', (data) => {
        const { signal, to } = data;
        socket.to(to).emit('signal', { signal, from: socket.id });
    });

    socket.on('disconnect', () => {
        const room = socket.room;
        if (room) {
            chatModel.removeUserFromRoom(room, socket.id);
        }
    });
};

module.exports = {
    handleConnection
};
