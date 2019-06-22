const http = require('http')
const socketio = require('socket.io')
const path = require('path')
const express = require('express')
const PORT = process.env.PORT

const app = express()
const server = http.createServer(app)
const io = socketio(server)

app.use(express.static( path.join(__dirname, '../public')))

io.on('connection', (socket) => {
    console.log('New WebSocket connection')

    socket.emit('message', 'Hey! Welcome to my socket.io class!')
    socket.broadcast.emit('message', 'A new user has joined!')

    socket.on('userMessage', (message) => {
        io.emit('userMessage', message)
    })


    socket.on('disconnect', () => {
        io.emit('message', 'A user has left!')
    })
})

server.listen(PORT, () => {
    console.log(`Server is UP on port: ${PORT}`)
})