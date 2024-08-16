const express = require('express')
const morgan = require('morgan')
const helmet = require('helmet')
const cors = require('cors')
const pino = require('pino')
const { Server } = require('socket.io')
const http = require('http')

const app = express()
const logger = pino()
const server = http.createServer(app)

app.use(helmet)
app.use(cors())
app.use(morgan('common'))
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.get('/', (req, res) => {
    res.send('home')
})

// const io = new Server(server, { 
//     cors: { 
//         origin: "*"
//     },
// })

const io = require('socket.io')(server, {
    cors: {
        // origin: [],
        // methods: [],
        // allowedHeaders: [],
        // credentials: true
    }
});


io.on("connection", (socket) => {
    console.log(`User connected: ${socket.id}`);

    socket.on('send_message', (data) => {
        console.log(data);
        socket.broadcast.emit('receive_message', data)
    })

    socket.on("chat", (payload) => {
        console.log('payload:', payload);
        io.emit('chat', payload)
    })
})

server.listen(3000, () => {
    console.log('connected');
})