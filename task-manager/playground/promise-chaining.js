require('../src/db/mongoose')
const User = require('../src/models/user')

// 5cfc1863ee2e210a642c22aa

// User.findByIdAndUpdate('5cfc1a1f29f59f260839fce3', { age: 2}).then((user) => {
//     console.log(user)
//     return User.countDocuments({ age: 1 })
// }).then(result => {
//     console.log(result)
// }).catch(e => {
//     console.log(e)
// })

const updateAgeAndCount = async (id, age) => {
    const user = await User.findByIdAndUpdate(id, { age })
    const count = await User.countDocuments( { age } )
    return {
        user, 
        count
    }
}

updateAgeAndCount('5cfc1a43b9af7b2fd0ab01a6', 3).then(result => {
    console.log(result)
}).catch(e => {
    console.log(e)
})