const https = require('https')

const url = 'https://api.darksky.net/forecast/b4f4580e775b155a014fe2692295b158/-9,-35?units=auto&lang=pt'

const request = https.request(url, (response) => {
    let data = ''


    response.on('data', (chunk) => {
        data += chunk.toString()
    })
    
    response.on('end', () => {
        const body = JSON.parse(data)
        console.log(body)
    })
})


request.on('error', (error) => {
    console.log('Error', error)
})


request.end()