const path = require('path')
const express = require('express')

const app = express()

app.use(express.static(path.join(__dirname, '../public')))


app.get('/weather', (req, res)=> {
    res.send({
        forecast: 'Time is good',
        location: 'Maceio'
    })
})



app.listen(3000, () => {
    console.log('Server up! On port:' + 3000)
})