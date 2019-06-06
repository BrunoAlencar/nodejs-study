console.log('cliente side js file is loaded')



const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

// messageOne.textContent = 'from javascript'

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    messageTwo.textContent = ''
    
    const location = search.value
    messageOne.textContent = 'Loading...'
    fetch('http://localhost:3000/weather?address=' + location).then(response => {
        response.json().then(data => {
            messageOne.textContent = ''
            if (data.error) {
                return messageTwo.textContent = data.error
            }

            messageTwo.innerHTML = data.location + '<br>' + data.forecast.summary
            console.log(data.location)
            console.log(data.forecast)
        })
    })

})