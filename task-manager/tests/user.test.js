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
    const response = await request(app).post('/users').send({
        name: 'João Bruno',
        email: 'joaobrunoalencar@gmail.com',
        password: '123456'
    }).expect(201)

    // Assert that the database was changed correctly
    const user = await User.findById(response.body.user._id)
    expect(user).not.toBeNull()

    // Assertions about the response
    expect(response.body.user.name).toBe('João Bruno')
    expect(response.body).toMatchObject({
        user: {
            name: 'João Bruno',
            email: 'joaobrunoalencar@gmail.com',
        },
        token: user.tokens[0].token
    })

    expect(user.password).not.toBe('123456')
})


test('Should login existing user', async () => {
    const response = await request(app).post('/users/login').send({
        email: userOne.email,
        password: userOne.password
    }).expect(200)

    const user = await User.findById(response.body.user._id)
    expect(response.body.token).toBe(user.tokens[0].token)
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

test('Should delete a account for user', async () => {
    const response = await request(app)
        .delete('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)

    const user = await User.findById(userOneId)
    expect(user).toBeNull()
})

test('Should not delete user', async () => {
    await request(app)
        .delete('/users/me')
        .send()
        .expect(401)
})


test('Should upload avatar image', async () => {
    await request(app)
        .post('/users/me/avatar')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .attach('avatar', 'tests/fixtures/profile-pic.jpg')
        .expect(200)
    const user = await User.findById(userOneId)
    expect(user.avatar).toEqual(expect.any(Buffer))
})

test('Should update valid user fields', async () => {
    request(app)
    .patch('/users/me')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send({
        name: 'Mike Updated'
    })
    .expect(200)

    const user = await User.findById(userOneId)
    expect(user.name).toBe('Mike Updated')
})

test('Should update invalid user fields', async () => {
    request(app)
    .patch('/users/me')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send({
        location: 'Mike Updated'
    })
    .expect(400)

})