const socket = io()

socket.on('message', (message) => {
    console.log(message)
})

socket.on('userMessage', (message) => {
    document.querySelector('#allMessages').innerHTML += `<p>${message}</p>`
})

document.querySelector('#myForm').addEventListener('submit', (e) => {
    e.preventDefault()
    const message = e.target.elements.message.value

    socket.emit('userMessage', message)
})

