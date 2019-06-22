const http = require('http')
const socketio = require('socket.io')
const Filter = require('bad-words')
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

    socket.on('userMessage', (message, callback) => {
        const filter = new Filter()

        if(filter.isProfane(message)){
            return callback('Profanity is not allowed!')
        }

        io.emit('userMessage', message)
        callback('Delivered!')
    })

    socket.on('sendLocation', (coords, callback) => {
        io.emit('message', `https://google.com/maps?q=${coords.latitude},${coords.longitude}`)
        callback()
    })


    socket.on('disconnect', () => {
        io.emit('message', 'A user has left!')
    })
})

server.listen(PORT, () => {
    console.log(`Server is UP on port: ${PORT}`)
})