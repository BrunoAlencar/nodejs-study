const mondodb = require('mongodb')
const MongoClient = mondodb.MongoClient

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'


MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
    if(error) {
        return console.log('Unable to connect to database', error)
    }


    const db = client.db(databaseName)

    // db.collection('users').insertOne({
    //     name: 'Bruno',
    //     age: 23
    // }, (error, result) => {
    //     if(error){
    //         return console.log('Unable to insert user', error)
    //     }

    //     console.log(result.ops)
    // })

    // db.collection('users').insertMany([
    //     {
    //         name: 'Jen',
    //         age: 28
    //     }, {
    //         name: 'Gunter',
    //         age: 26
    //     }
    // ], (error, result) => {
    //     if(error) {
    //         return console.log('Unable to insert documents', error)
    //     }

    //     console.log(result.ops)
    // })

    db.collection('tasks').insertMany([
        {
            description: 'Study one hour per day',
            completed: true
        },
        {
            description: 'Do exercises',
            completed: true
        },
        {
            description: 'Eat well',
            completed: false
        }
    ], (error, result) => {
        if(error){
            return console.log('Unable to insert tasks documents', error)
        }

        console.log(result.ops)
    })

})
