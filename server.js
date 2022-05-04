require('dotenv').config()
const mongoose = require('mongoose')
const portions = require('./routes/portions')
const helmet = require('helmet')
const cors = require('cors')
const express = require('express')
// const req = require('express/lib/request')
// const res = require('express/lib/response')

mongoose.connect(process.env.DB_URI + '/portions')
const app = express()

app.use(helmet())
app.use(cors({
    origin: 'http://localhost:3000'
}))
app.use(express.json())
app.use('/api/portions', portions)

// Start the app

app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}...`)
})
