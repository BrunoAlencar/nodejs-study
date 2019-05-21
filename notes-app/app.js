const getNotes = require('./notes')
const chalk = require('chalk')
const yargs = require('yargs')


// yargs.version('1.1.0')

console.log(yargs.argv)
// node app.js remove --title="bruno aprendendo"

// create add command
yargs.command({
    command: 'add',
    describe: 'Add a new note',
    handler: function () {
        console.log('adding new note') 
    }
})
// add, remove, read, list