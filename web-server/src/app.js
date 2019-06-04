const path = require('path')
const express = require('express')
const hbs = require('hbs')

const app = express()

// define paths to express config
const publicDirectory = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//  Setup handlebars engine and view locaiton
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectory))


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather app',
        name: 'João Bruno Alencar'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'João Bruno Alencar'
    })
})

app.get('/help', (req, res) => [
    res.render('help', {
        message: 'Hey, do you have any problem with this application?? Please contact me!',
        title: 'Help Page'
    })
])

app.get('/weather', (req, res) => {
    res.send({
        forecast: 'Time is good',
        location: 'Maceio'
    })
})



app.listen(3000, () => {
    console.log('Server up! On port:' + 3000)
})