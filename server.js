const express = require('express');
const { createServer } = require('http');
const path = require('path');
const socket = require('socket.io');

const app = express();
const server = createServer(app);
const io = socket(server);

const USERS = new Map();
const PORT = process.env.PORT || 8000;

io.on('connection', socket => {
    if (!USERS.has(`user-${socket.id}`)) {
        USERS.set(`user-${socket.id}`, socket.id);
    }

    socket.emit('yourId', socket.id);
    io.sockets.emit('allUsers', USERS);
    socket.on('disconnect', () => {
        USERS.delete(`user-${socket.id}`);
    });

    // socket.on("callUser", (data) => {
    //     io.to(data.userToCall).emit('hey', {signal: data.signalData, from: data.from});
    // });

    // socket.on("acceptCall", (data) => {
    //     io.to(data.to).emit('callAccepted', data.signal);
    // });
});

if (process.env.NODE_ENV === 'production') {
    // Serve any static files
    app.use(express.static(path.join(__dirname, 'client/build')));
        
    // Handle React routing, return all requests to React app
    app.get('*', function(req, res) {
        res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
    }); 
}

server.listen(PORT, () => console.log(`server is listening on port ${PORT}`));