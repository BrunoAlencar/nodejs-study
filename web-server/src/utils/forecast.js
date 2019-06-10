const request = require('request')


const forecast = (latitude, longitude, callback) => {

    const url = 'https://api.darksky.net/forecast/MY ID TOKEN HERE/' + latitude +','+ longitude + '?units=auto&lang=pt'

    request({ url: url, json: true }, (error, {body}) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, {
                summary: body.daily.data[0].summary,
                temperature: body.currently.temperature,
                apparentTemperature: body.currently.apparentTemperature,
                precipProbability: body.currently.precipProbability
            })
        }

    })
}


module.exports = forecast