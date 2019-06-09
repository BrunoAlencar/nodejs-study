const express = require('express')
require('./db/mongoose')
const User = require('./models/user')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

app.post('/users', (req, res) => {
    const user = new User(req.body)

    user.save().then(result => {
        res.send(result)
    }).catch(({message}) =>{
        res.status(400).send({'Error': message})
    })
})

app.listen(port, () => {
    console.log('Server is on the port: ' + port)
})

// https://httpstatuses.com/