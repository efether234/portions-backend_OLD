require('dotenv').config()
require('express-async-errors')
const winston = require('winston')
require('winston-mongodb')
const startupDebug = require('debug')('app:startup')
const dbDebug = require('debug')('app:db')
const error = require('./middleware/error')
const mongoose = require('mongoose')
const morgan = require('morgan')
const portions = require('./routes/portions')
const users = require('./routes/users')
const auth = require('./routes/auth')
const helmet = require('helmet')
const cors = require('cors')
const express = require('express')

process.on('uncaughtException', (ex) => {
    winston.error(ex.message, ex);
    process.exit(1)
})

process.on('unhandledRejection', (ex) => {
    winston.error(ex.message, ex);
    process.exit(1)
})

winston.add(new winston.transports.File({ filename: 'logfile.log' }))
winston.add(new winston.transports.MongoDB({ db: process.env.DB_URI + '/portions' }))

if (!process.env.JWTPRIVATEKEY) {
    console.error('FATAL ERROR: JWTPRIVATEKEY is not defined')
    process.exit(1)
}

mongoose.connect(process.env.DB_URI + '/portions', (error) => {
    if (error) {
        dbDebug('Could not connect to DB.')
    } else {
        dbDebug('Sucessfully connected to DB.')
    }
})
const app = express()

if (app.get('env') === 'development') {
    app.use(morgan('tiny'))
    startupDebug('Morgan enabled...')
}
app.use(helmet())
app.use(cors({
    origin: 'http://localhost:3000'
}))
app.use(express.json())
app.use('/api/portions', portions)
app.use('/api/users', users)
app.use('/api/auth', auth)

app.use(error)

// Start the app

app.listen(process.env.PORT, () => {
    startupDebug(`Listening on port ${process.env.PORT}...`)
})
