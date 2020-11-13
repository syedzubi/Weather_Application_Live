console.log("Client JavaScript is loaded")


const weatherForm = document.querySelector('form')

const searchElement = document.querySelector('input')
const messageElementOne = document.querySelector('#message-1')
const messageElementTwo = document.querySelector('#message-2')


weatherForm.addEventListener('submit', (e)=>{
  e.preventDefault()
  
  const location = searchElement.value
  messageElementOne.textContent = 'Loading...'
  messageElementTwo.textContent = ''
  fetch('http://localhost:3000/weather?address='+location).then((response)=>{
    response.json().then((data)=>{
        if(data.Error)
          {
          messageElementOne.textContent = data.Error
          }
        else
          {
          messageElementOne.textContent = data.Location
          messageElementTwo.textContent = data.Forecast
          }
      })
  })
})