// Body Parser
const bodyParser = require('body-parser')
const port = 3000

// Setup empty JS object to act as endpoint for all routes
projectData = {}

// Require Express to run server and routes and start an instance of app
const express = require('express')
const app = express()
// Initialize the main project folder
app.use(express.static('website'))

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Cors for cross origin allowance
const cors = require('cors')
app.use(cors())

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})

// Setup Server
app.get('/send', (req, res) => {
  res.send(projectData)
})

app.post('/add', (req, res) => {
  projectData = {
    temp: req.body.data.main.temp,
    date: req.body.newDate,
    weatherCondition: req.body.weatherCondition,
    country: req.body.country,
    weatherIcon: req.body.weatherIcon,
  }
})
