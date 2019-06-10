require('../src/db/mongoose')
const Task = require('../src/models/task')

Task.findByIdAndDelete('5cfd733f3ad1ce2244a25f06').then(result => {
    console.log(result)
    return Task.countDocuments({ completed:false })
}).then(numberOfInconpleteTasks => {
    console.log(numberOfInconpleteTasks)
}).catch(e => {
    console.log(e)
})