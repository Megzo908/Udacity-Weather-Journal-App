// Global Variables

// Is it safe to put the api keys on the front end like that ??
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather?zip='
const API_KEY = '&appid=a367587e8fdf0b056f1008204dea2b80&units=metric'
const SERVER_URL = 'http://localhost:3000/'

// Create a new date instance dynamically with JS
let d = new Date()
let newDate = d.toDateString()

// HTML Selectors
const generate = document.querySelector('#generate')
const entryholder = document.querySelector('#entryHolder')
const date = document.querySelector('#date')
const temp = document.querySelector('#temp')
let content = document.querySelector('#content')

// Getting data from API
const APIdata = async () => {
  let zip = document.querySelector('#zip').value
  let feelings = document.querySelector('#feelings').value
  // API
  const data = await (await fetch(BASE_URL + zip + API_KEY)).json()
  // Update UI with API data
  date.innerText = newDate
  temp.innerText = data.main.temp + '°C'
  content.innerText = feelings
  // Send and then receive data from the server
  sendToServer(`${SERVER_URL}add`, { data, newDate, feelings })
  receiveFromServer()
}
// Send data to the server with fetch post method
const sendToServer = async (url = '', data = {}) => {
  const sentData = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
}
// Update UI with server data
const receiveFromServer = async () => {
  const res = await (await fetch(`${SERVER_URL}send`)).json() // Default method on fetch **GET
  date.innerText = res.date
  temp.innerText = res.temp + '°C'
  content.innerText = res.content
}

// Update UI when button is clicked
generate.addEventListener('click', APIdata)
