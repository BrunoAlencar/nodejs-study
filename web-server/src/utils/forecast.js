const request = require('request')


const forecast = (latitude, longitude, callback) => {

    const url = 'https://api.darksky.net/forecast/b4f4580e775b155a014fe2692295b158/' + latitude +','+ longitude + '?units=auto&lang=pt'

    request({ url: url, json: true }, (error, {body}) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, {
                summary: body.daily.data[0].summary,
                temperature: body.currently.temperature,
                precipProbability: body.currently.precipProbability
            })
        }

    })
}


module.exports = forecast