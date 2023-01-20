require('dotenv').config()
const axios = require('axios')

const APIKEYS = {
  URL: process.env.BASE_URL,
  KEY: process.env.API_KEY,
}

weatherData = {}

// Server setup

//Express
const express = require('express')
const app = express()
app.use(express.static('website'))

//Body Parser
const bodyParser = require('body-parser')
const port = 3000
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//CORS
const cors = require('cors')
app.use(cors({ origin: '*' }))

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})

//Recieving city name, using it to make a get request from weather API then sending the data to the frontend
app.post('/postcityselector', (req, res) => {
  axios.get(APIKEYS.URL + req.body.city + APIKEYS.KEY).then(response => {
    weatherData.city = response.data
    app.get('/fulldata', (req, res) => {
      res.send(weatherData.city)
    })
    res.sendStatus(200)
  })
})
