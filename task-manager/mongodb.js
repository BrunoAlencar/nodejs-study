const { MongoClient, ObjectID } = require('mongodb')

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'




MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
    if(error) {
        return console.log('Unable to connect to database', error)
    }


    const db = client.db(databaseName)

    // db.collection('users').findOne( { _id: new ObjectID("5cfb0363b9aec801c8cff59a")  },  (error, user) => {
    //     if(error) return console.log('Unable to fetch')

    //     console.log(user)
    // })

    db.collection('tasks').findOne({ _id: new ObjectID('5cfb01678c560a0bec9f4c1c') }, (error, task) => {
        if(error) return console.log(error)

        console.log(task)
    })

    db.collection('tasks').find({completed: false}).toArray((error, tasks) => {
        if(error) return console.log(error)

        console.log(tasks)
    })

})
