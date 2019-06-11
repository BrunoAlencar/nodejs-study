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


const bcrypt = require('bcrypt')

const myFunction = async () => {
    const password = '123456'
    const hashPassword = await bcrypt.hash(password, 8)

    console.log(password)
    console.log(hashPassword)

    const isMatch = await bcrypt.compare(password, hashPassword)
    console.log(isMatch)
}
myFunction()