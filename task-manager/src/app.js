const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

app.use(userRouter)
app.use(taskRouter)




app.listen(port, () => {
    console.log('Server is on the port: ' + port)
})

// https://httpstatuses.com/


// const jwt = require('jsonwebtoken')

// const myFunction = async () => {
//     const token = jwt.sign({ _id: 'abc123' }, 'thisismynewcourse', {
//         expiresIn: '7 days'
//     })
//     console.log(token)

//     console.log(jwt.verify(token, 'thisismynewcourse'))
// }
// myFunction()