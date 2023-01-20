// Global Variables
const SERVER_URL = 'http://localhost:3000/'
const COUNTRIES_NAMES_API = 'https://restcountries.com/v3.1/all'
// Create a new date instance
const CURRENTDATE = new Date().toDateString()

// HTML Selectors
const generate = document.querySelector('#generate')
const date = document.querySelector('.date')
const temp = document.querySelector('.temperature')
const weatherCondition = document.querySelector('.weatherCondition')
const country = document.querySelector('.place')
const weatherIcon = document.querySelector('.wi')

const countriesNames = async () => {
  const select = document.querySelector('#countries')

  const countriesList = await (await fetch(COUNTRIES_NAMES_API)).json()

  countriesList.splice(38, 1)

  countriesList.forEach(country => {
    const option = document.createElement('option')
    if (country.capital) {
      option.innerText = `${country.capital[0]}`
      select.append(option)
    }
  })
}

// Posting city name to server then getting data back after the request to API has been made
const Main = async () => {
  const citySelector = document.querySelector('#countries').value
  axios.post(`${SERVER_URL}postcityselector`, { city: citySelector })

  setTimeout(async () => {
    const data = await axios.get(`${SERVER_URL}fulldata`)
    // Update UI with API data
    weatherIcon.src = `http://openweathermap.org/img/wn/${data.data.weather[0].icon}@4x.png`
    date.innerText = CURRENTDATE
    temp.innerText = Math.floor(data.data.main.temp) + '°C'
    weatherCondition.innerText = data.data.weather[0].description
    country.innerText = data.data.name
  }, 800)
}

countriesNames()
// Update UI when button is clicked
generate.addEventListener('click', Main)
