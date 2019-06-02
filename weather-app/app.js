const request = require('request')


// const url = 'https://api.darksky.net/forecast/b4f4580e775b155a014fe2692295b158/-9.5934459,-35.7567185?units=auto&lang=pt'

// request({ url: url, json: true }, (error, response) => {
//     if (error) {
//         console.log('Unable to connect to weather service!')
//     } else if(response.body.error){
//         console.log('Unable to find location')
//     } else {
//         const body = response.body
//         console.log(body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degrees out. There is a ' + body.currently.precipProbability + '% chance of rain.')
//     }

// })


const urlGeo = 'https://api.mapbox.com/geocoding/v5/mapbox.places/maceio.json?access_token=pk.eyJ1IjoiYnJ1bm9hbGVuY2FyIiwiYSI6ImNqODI4NmN3ejJoNnkycW8yaHVvNHUwY20ifQ.rOAPfJGQOQtTx2MguCirYA&limit=1&language=pt';
request({ url: urlGeo, json:true}, (err, res)=> {
    if(err) {
        console.log('Unable to connect to geocoding service!')
    }  else if (res.body.message || res.body.features.length == 0){
        console.log('Unable to find geolocation')
    }else {
        console.log(res.body.features[0].center[0], res.body.features[0].center[1])
    }
})