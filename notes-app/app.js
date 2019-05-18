const fs = require('fs')

fs.writeFileSync('notes.txt', 'This file was created be Node.js and Bruno Alencar')

// i get the wrong function hehe =\
// fs.appendFile('notes.txt', '\n I am trying to append text to my file', (err)=> {
//     if(err) throw err;
// })

fs.appendFileSync('notes.txt', '\n I am trying to append text to my file')