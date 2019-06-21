const request = require('supertest')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const app = require('../src/app')
const User = require('../src/models/user')


const userOneId = new mongoose.Types.ObjectId()
const userOne = {
    _id: userOneId,
    name: 'Mike',
    email: 'mike@mail.com',
    password: '123456',
    tokens: [{
        token: jwt.sign({ _id: userOneId }, process.env.JSON_WEB_TOKEN_KEY)
    }]
}

beforeEach(async () => {
    await User.deleteMany()
    await new User(userOne).save()
})

// afterEach(()=> {
//     console.log('afterEach')
// })

test('Should signup a new user', async () => {
    await request(app).post('/users').send({
        name: 'João Bruno',
        email: 'joaobrunoalencar@gmail.com',
        password: '123456'
    }).expect(201)
})


test('Should login existing user', async () => {
    await request(app).post('/users/login').send({
        email: userOne.email,
        password: userOne.password
    }).expect(200)
})

test('Should not login nonexistent user', async () => {
    await request(app).post('/users/login').send({}).expect(400)
})

test('Should get profile for user', async () => {
    await request(app)
        .get('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)
})

test('Should not get profile for unauthenticated user', async () => {
    await request(app)
    .get('/users/me')
    .send()
    .expect(401)
})

test('Should delete a account for user', async ()=> {
    await request(app)
    .delete('/users/me')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200)
})

test('Should not delete user', async () => {
    await request(app)
    .delete('/users/me')
    .send()
    .expect(401)
})