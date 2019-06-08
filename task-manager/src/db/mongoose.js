const mongoose = require('mongoose')
const validator = require('validator')

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
    useNewUrlParser: true,
    useCreateIndex: true
})

const User = mongoose.model('User', {
    name: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: [6, 'You need at least 6 characters at password'],
        validate(value) {
            if(value.toLowerCase().includes('password')){
                throw new Error('Password can not have the text \"password\"')
            }
        }
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase:true,
        validate(value) {
            if(!validator.isEmail(value)){
                throw new Error('Email is invalid')
            }
        }
    },
    age: {
        type: Number,
        default: 0,
        validate(value) {
            if(value < 0) {
                throw new Error('Age must be a positive number')
            }
        }
    },
})

// const me = new User({
//     name: '  Mike  ',
//     age: 1,
//     email: 'aa@MAIil.com   ',
//     password: 'PassaWord123'
// })
// me.save().then(result => {
//     console.log(result)
// }).catch(({message}) => {
//     console.log(message)
// })









const Task = mongoose.model('Task', {
    description: {
        type: String,
        required: true,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    }
})


const task1 = new Task({
    description: 'Nooo hoo noo    ',
}).save()
.then(res => console.log(res))
.catch(({message})=>  console.log(message))



