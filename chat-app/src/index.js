const path = require('path')
const express = require('express')
const app = express()
const PORT = process.env.PORT

app.use(express.static( path.join(__dirname, '../public')))

app.listen(PORT, () => {
    console.log(`Server is UP on port: ${PORT}`)
})