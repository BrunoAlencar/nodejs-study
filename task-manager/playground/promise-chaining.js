require('../src/db/mongoose')
const User = require('../src/models/user')

// 5cfc1863ee2e210a642c22aa

User.findByIdAndUpdate('5cfc1a1f29f59f260839fce3', { age: 2}).then((user) => {
    console.log(user)
    return User.countDocuments({ age: 1 })
}).then(result => {
    console.log(result)
}).catch(e => {
    console.log(e)
})