const fs = require('fs')


// fs.writeFileSync('1-json.json', bookJSON)

const book = JSON.parse(fs.readFileSync('1-json.json'))
console.log('Before', JSON.parse(fs.readFileSync('1-json.json')))

book.title = "Seja Foda"
book.author = "Caio Carneiro"

fs.writeFileSync('1-json.json', JSON.stringify(book))

console.log('After', JSON.parse(fs.readFileSync('1-json.json')))