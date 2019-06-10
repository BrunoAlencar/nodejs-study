const express = require('express')
require('./db/mongoose')
const User = require('./models/user')
const Task = require('./models/task')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

app.post('/users', (req, res) => {
    const user = new User(req.body)

    user.save().then(result => {
        res.status(201).send(result)
    }).catch(({message}) =>{
        res.status(400).send({error: message})
    })
})

app.get('/users', (req, res) => {
    User.find().then(result => {
        res.status(200).send(result)
    }).catch(({message}) => {
        res.status(500).send({error: message})
    })
})

app.get('/users/:id', (req, res) => {
    const _id = req.params.id

    User.findById(_id).then(user => {
        if(!user) {
            return res.status(404).send({error: 'User not found'})
        }
        res.send(user)
    }).catch(({message}) => {
        res.status(400).send({error: message})
    })
    
    console.log(req.params)
})


app.post('/tasks', (req, res) => {
    const task = new Task(req.body)

    task.save().then(result => {
        res.status(201).send(result)
    }).catch(({message}) => {
        res.status(400).send({ error: message})
    })
})

app.get('/tasks', (req, res) => {
    Task.find().then(tasks => {
        res.send(tasks)
    }).catch(({message}) => {
        res.status(500).send({error: message})
    })
})

app.get('/tasks/:id', (req, res) => {
    const _id = req.params.id

    Task.findById(_id).then(result => {
        if(!result){
            return res.status(404).send({error: 'Task not found'})
        }
        res.send(result)
    }).catch(({message}) => {
        res.status(500).send({error: message})
    })
})


app.listen(port, () => {
    console.log('Server is on the port: ' + port)
})

// https://httpstatuses.com/