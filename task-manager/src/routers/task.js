const express = require('express')
const Task = require('../models/task')
const router = new express.Router()

router.post('/tasks', async (req, res) => {
    const task = new Task(req.body)

    try {
        await task.save()
        res.status(201).send(task)
    } catch ({ message }) {
        res.status(400).send({ error: message })
    }

})

router.get('/tasks', async (req, res) => {

    try {
        const tasks = await Task.find()
        res.send(tasks)
    } catch ({ message }) {
        res.status(500).send({ error: message })
    }
})

router.get('/tasks/:id', async (req, res) => {
    const _id = req.params.id


    try {
        const task = await Task.findById(_id)
        if (!task) {
            return res.status(404).send({ error: 'Task not found' })
        }
        res.send(task)
    } catch ({ message }) {
        res.status(500).send({ error: message })
    }

})

router.patch('/tasks/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdate = ['completed', 'description']
    const isValidOperation = updates.every(update => allowedUpdate.includes(update))

    if(!isValidOperation){
        return res.status(400).send({error: 'Update not allowed!'})
    }

    try {
        const task = await Task.findById(req.params.id)

        updates.forEach(update => task[update] = req.body[update])
        await task.save()
        // const task = await Task.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true})
        
        res.send(task)
        
    } catch ({message}) {
        res.status(500).send({error: message})
    }

})

router.delete('/tasks/:id', async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id)

        if(!task) {
           return res.status(404).send({error: 'Task not found'})
        }

        res.send(task)
    } catch ({message}) {
        res.status(500).send({error: message})
    }
})

module.exports = router