require('dotenv').config()
const winston = require('winston')
const helmet = require('helmet')
const cors = require('cors')
const express = require('express')

const app = express()
require('./startup/logging')()
require('./startup/db')()
require('./startup/config')
require('./startup/routes')(app)

app.use(helmet())
app.use(cors())

// Start the app

app.listen(process.env.PORT, () => {
    winston.info(`Listening on port ${process.env.PORT}...`)
})
