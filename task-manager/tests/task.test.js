const request = require('supertest')
const app = require('../src/app')
const Task = require('../src/models/task')
const {
    userOneId,
    userOne,
    userTwoId,
    userTwo,
    setupDatabase,
    taskOne,
    taskTwo,
    taskThree
} = require('./fixtures/db')


beforeEach(setupDatabase)

test('Should create task for user', async () => {
    const response = await request(app)
        .post('/tasks')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            description: 'From my test'
        })
        .expect(201)

    const task = await Task.findById(response.body._id)
    expect(task).not.toBeNull()
    expect(task.completed).toEqual(false)
})

test('Should return all tasks of the user', async () => {
    const response = await request(app)
        .get('/tasks')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)

    expect(response.body.length).toBe(2)
})

test('Should not delete the task from another user', async () => {
    await request(app)
        .delete('/tasks/' + taskThree._id)
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(404)

    const task = await Task.findById(taskThree._id)
    expect(task).not.toBeNull()
})


test('Should not create task with invalid description/completed', async () => {
    await request(app)
    .post('/tasks')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send({
        description: '',
        completed: ''
    })
    .expect(400)
})
test(' Should not update task with invalid description/completed', async () => {
    await request(app)
    .patch('/tasks/' + taskOne._id)
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send({
        description: '',
        completed: ''
    })
    .expect(500)
})
test('Should delete user task', async () => {
    await request(app)
    .delete('/tasks/' + taskOne._id)
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200)
})
test('Should not delete task if unauthenticated', async () => {
    await request(app)
    .delete('/tasks/' + taskOne._id)
    .send()
    .expect(401)
})
test('Should not update other users task', async () => {
    await request(app)
    .delete('/tasks/' + taskOne._id)
    .set('Authorization', `Bearer ${userTwo.tokens[0].token}`)
    .send()
    .expect(404)
})

test('Should fetch user task by id', async () => {
    await request(app)
    .get('/tasks/' + taskOne._id)
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200)
})
test('Should not fetch user task by id if unauthenticated', async () => {
    await request(app)
    .get('/tasks/' + taskOne._id)
    .send()
    .expect(401)
})
test('Should not fetch other users task by id', async () => {
    await request(app)
    .get('/tasks/' + taskOne._id)
    .set('Authorization', `Bearer ${userTwo.tokens[0].token}`)
    .send()
    .expect(404)
})
test('Should fetch only completed tasks', async () => {
    const response = await request(app)
    .get('/tasks?completed=true')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200)
    expect(response.body[0].completed).toBe(true)
    
})
test('Should fetch only incomplete tasks', async () => {
    const response = await request(app)
    .get('/tasks?completed=false')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200)
    expect(response.body[0].completed).toBe(false)
})
test('Should sort tasks by description/completed/createdAt/updatedAt', async () => {
    var response = await request(app)
    .get('/tasks?sortBy=createdAt:desc')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200)
    expect(response.body[0].description).toBe('Second task')

    response = await request(app)
    .get('/tasks?sortBy=updatedAt:asc')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200)
    expect(response.body[0].description).toBe('First task')    
})
test('Should fetch page of tasks', async () => {
    var response = await request(app)
    .get('/tasks?skip=0&limit=1')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200)
    expect(response.body[0].description).toBe('First task') 

    response = await request(app)
    .get('/tasks?skip=1&limit=1')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200)
    expect(response.body[0].description).toBe('Second task') 
})
