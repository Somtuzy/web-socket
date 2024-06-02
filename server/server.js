const app = require('express')();

const server = require('http').createServer(app);

const io = require('socket.io')(server, {
    cors: {
        // origin: [],
        // methods: [],
        // allowedHeaders: [],
        // credentials: true
    }
});

io.on("connection", (socket) => {
    // console.log('socket is active:', socket)
    console.log('socket is active', socket.id)


    socket.on("chat", (payload) => {
        console.log('payload:', payload);
        io.emit('chat', payload)
    })
})

server.listen(3000, () =>  {
    console.log('server running on port 3000');
}) 