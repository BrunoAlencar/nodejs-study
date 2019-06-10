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

const deleteTaskAndCount = async (id) => {
    const task = await Task.findByIdAndDelete(id)
    const count = await Task.countDocuments({ completed: false })
    return {
        task,
        count
    }
}


deleteTaskAndCount('5cfc1c0e7af40f305ccc68d6').then(result => {
    console.log(result)
}).catch(e => {
    console.log(e)
})