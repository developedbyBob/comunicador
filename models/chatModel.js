const rooms = {};

const addUserToRoom = (room, socketId) => {
    if (!rooms[room]) {
        rooms[room] = [];
    }
    rooms[room].push(socketId);
};

const removeUserFromRoom = (room, socketId) => {
    if (rooms[room]) {
        rooms[room] = rooms[room].filter(id => id !== socketId);
        if (rooms[room].length === 0) {
            delete rooms[room];
        }
    }
};

const getOtherUsersInRoom = (room, socketId) => {
    return rooms[room] ? rooms[room].filter(id => id !== socketId) : [];
};

module.exports = {
    addUserToRoom,
    removeUserFromRoom,
    getOtherUsersInRoom
};
