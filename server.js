require('dotenv').config()
const startupDebug = require('debug')('app:startup')
const dbDebug = require('debug')('app:db')
const mongoose = require('mongoose')
const morgan = require('morgan')
const portions = require('./routes/portions')
const users = require('./routes/users')
const helmet = require('helmet')
const cors = require('cors')
const express = require('express')

mongoose.connect(process.env.DB_URI + '/portions', (error) => {
    if (error) {
        dbDebug(error)
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

// Start the app

app.listen(process.env.PORT, () => {
    startupDebug(`Listening on port ${process.env.PORT}...`)
})
