const getNotes = require('./notes')
const chalk = require('chalk')
const yargs = require('yargs')


// yargs.version('1.1.0')

// node app.js remove --title="bruno aprendendo"

// create add command
yargs.command('add', 'Add a new note', () => {
    console.log('adding new note')
})

yargs.command('remove', 'remove a note', () => {
    console.log('Removing a note')
})


yargs.command('list', 'list notes', () => { console.log('Showing all notes')})
yargs.command('read', 'read a note', () => { console.log('Reading a single note') })

console.log(yargs.argv) // need this to active yargs argv
// yargs.command()
// add, remove, read, list