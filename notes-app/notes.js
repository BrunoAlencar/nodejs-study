const fs = require('fs')
const chalk = require('chalk')

const getNotes = function (){
    return 'Your notes'
}


const addNote = function (title, body) {
    const notes = loadNotes()

    const duplicateNotes = notes.filter(function (note) {
        return note.title == title
    })
    if(duplicateNotes.length === 0){
        notes.push({
            title,
            body
        })
        saveNotes(notes)
        console.log('New note added')
    }else {
        console.log('Note title duplicated!')
    }

}

const removeNote = function (title) {
    const notes = loadNotes()

    const noteToRemove = notes.filter(function (note, index) {
        if(note.title == title){
            notes.splice(index, 1)
            console.log(chalk.bgGreenBright.black('Note removed'))
            return true
        }else {
            return false
        }
    })
    if(noteToRemove.length == 0){
        console.log(chalk.bgRedBright.black('Note not exists'))
    }
    saveNotes(notes)
   

}

const saveNotes = function (notes) {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

const loadNotes = function () {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    } catch (e) {
        return []
    }
}


module.exports = {
    getNotes,
    addNote,
    removeNote
}