// Global Variables
const select = document.querySelector('#countries')
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather?q='
const API_KEY = '&appid=a367587e8fdf0b056f1008204dea2b80&units=metric'
const SERVER_URL = 'http://localhost:3000/'

const COUNTRIES_NAMES_API = 'https://restcountries.com/v3.1/all'

const countriesNames = async () => {
  const fetched = await fetch(COUNTRIES_NAMES_API)
  const jsoned = await fetched.json()

  jsoned.splice(38, 1)

  jsoned.forEach(country => {
    const option = document.createElement('option')
    option.innerText = country.name.common
    select.append(option)
  })
}

countriesNames()
// Create a new date instance dynamically with JS
let d = new Date()
let newDate = d.toDateString()

// HTML Selectors
const generate = document.querySelector('#generate')
const date = document.querySelector('.date')
const temp = document.querySelector('.temperature')
const weatherCondition = document.querySelector('.weatherCondition')
const country = document.querySelector('.place')
const weatherIcon = document.querySelector('.wi')

// Getting data from API
const APIdata = async () => {
  let countrySelector = document.querySelector('select').value
  // API
  const data = await (await fetch(BASE_URL + countrySelector + API_KEY)).json()
  // Update UI with API data
  date.innerText = newDate
  temp.innerText = data.main.temp + '°C'
  weatherCondition.innerText = data.weather[0].description
  country.innerText = data.name
  weatherIcon.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`

  // Send and then receive data from the server
  sendToServer(`${SERVER_URL}add`, {
    data,
    newDate,
    temp,
    weatherCondition,
    country,
    weatherIcon,
  })
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
  weatherCondition.innerText = res.weatherCondition
  country.innerText = country
}

// Update UI when button is clicked
generate.addEventListener('click', APIdata)
