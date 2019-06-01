 const request = require('request')


 const url = 'https://api.darksky.net/forecast/b4f4580e775b155a014fe2692295b158/37.8267,-122.4233'

 request({ url: url }, (error, response) => {
    const data = JSON.parse(response.body)

    console.log(data.currently)
})