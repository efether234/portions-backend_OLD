require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const date = require('date-and-time')
const cors = require('cors')

mongoose.connect('mongodb://localhost:27017/portions')
const app = express()
app.use(express.json())
app.use(cors())

defaultDate = new Date()

// Define the schema and model

const portionSchema = new mongoose.Schema({
    category: String,
    date: { type: Date, default: new Date() },
})

const Portion = mongoose.model('Portion', portionSchema)

// GET call to /api/portions should return all portions logged.

app.get('/api/portions', (req, res) => {
    Portion.find({}, (err, portions) => {
        res.send(portions)
    })
})

// GET call including params 'date' ashould return all portions logged on date
// Date format must be YYYY-MM-DD

app.get('/api/portions/:date', (req, res) => {
    Portion.find({
        date: {
            $gt: new Date(req.params.date),
            $lt: new Date(tomorrow(req.params.date))
        },
    }, (err, portions) => {
        res.send(portions)
    })
})

// POST call should create new portion with current date

app.post('/api/portions', (req, res) => {
    const portion = new Portion({
        category: req.body.category
    })
    portion.save()
    res.send(portion)
})

// DELETE call

app.delete('/api/portions/:cat', (req, res) => {
    Portion.deleteOne({ category: req.body.cat }, (err) =>{
        if (err) res.status(400).send('error')
    })
    res.status(200).send('Succesfully deleted')
})

const tomorrow = (input) => {
    // Convert the YYYY-MM-DD string to a JS Date object
    let date = new Date(input)

    // Add one day to the Date object
    date.setDate(date.getDate() + 1)

    // Break down incremented date object into YYYY-MM-DD string and return it
    const yyyy = String(date.getUTCFullYear())
    const mm = String(date.getUTCMonth() + 1).padStart(2, '0')
    const dd = String(date.getUTCDate()).padStart(2, '0')

    return `${yyyy}-${mm}-${dd}`
}

// Start the app

app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}...`)
})
