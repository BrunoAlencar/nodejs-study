const validator = require('validator')

const getNotes = require('./notes')

console.log(getNotes())


console.log(validator.isEmail('joaobrunoalencar@gmail.com'))
console.log(validator.isURL('www.google.comaz'))