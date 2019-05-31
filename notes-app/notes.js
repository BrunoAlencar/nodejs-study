const fs = require('fs')
const chalk = require('chalk')

const getNotes = () => {
    console.log(chalk.green.inverse('Your notes:'))
    const notes = loadNotes()
    // debugger
    //  to start and debbuging just use node inspect app.js
    notes.forEach(note => {
        console.log(chalk.green.inverse(note.title))
    });
    if(notes.length == 0){
        console.log(chalk.red.inverse('You dont have notes'))
    }
}

const readNote = (title) => {
    const notes = loadNotes()
    const noteFind = notes.find((note) => note.title == title)
    // console.log(noteFind)
    if(noteFind){
        console.log(chalk.green.inverse(JSON.stringify(noteFind)))
    }else {
        console.log(chalk.red.inverse('Note not found'))
    }
}


const addNote = (title, body) => {
    const notes = loadNotes()

    // const duplicateNotes = notes.filter((note) => note.title == title)
    
    const duplicateNotes = notes.find((note) => note.title == title)
   
    if(!duplicateNotes){
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

const removeNote =  (title) => {
    const notes = loadNotes()

    const noteToRemove = notes.filter((note, index) => {
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

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

const loadNotes = () => {
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
    removeNote,
    readNote
}