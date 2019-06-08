const mongoose = require('mongoose')
mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
    useNewUrlParser: true,
    useCreateIndex: true
})

// const User = mongoose.model('User', {
//     name: {
//         type: String
//     },
//     age: {
//         type: Number
//     }
// })

// const me = new User({
//     name: 'Bruno Alencar',
//     age: 'mike'
// })
// me.save().then(result => {
//     console.log(result)
// }).catch(({message}) => {
//     console.log(message)
// })









const Task = mongoose.model('Task', {
    description: {
        type: String
    },
    completed: {
        type: Boolean
    }
})


const task1 = new Task({
    description: 'Study every single day!',
    completed: false
}).save()
.then(res => console.log(res))
.catch(({message})=>  console.log(message))



