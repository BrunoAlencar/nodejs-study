const notes = require('./notes')
const chalk = require('chalk')
const yargs = require('yargs')


// yargs.version('1.1.0')

// node app.js remove --title="bruno aprendendo"

// create add command
yargs.command('add', 'Add a new note', () => {
    console.log('adding new note')
})

yargs.command({
    command: 'remove',
    describe: 'Remove a note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        },
    },
    handler: (argv) => {
       notes.removeNote(argv.title)
    }
})


yargs.command('list', 'list notes', () => { console.log('Showing all notes')})
yargs.command('read', 'read a note', () => { console.log('Reading a single note') })
yargs.command({
    command: 'add',
    describe: 'Adding new note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: 'Body text',
            demandOption: true,
            type: 'string'
        }
    },
    handler: (argv) => {
        // console.log('Title: ' + argv.title)
        // console.log('Body: ' + argv.body)
        notes.addNote(argv.title, argv.body)
    }
})

yargs.parse()
// yargs.command()
// add, remove, read, list