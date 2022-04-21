require('dotenv').config()
const mongoose = require('mongoose')
const date = require('date-and-time')
const express = require('express')

mongoose.connect('mongodb://localhost:27017/portions')
const app = express()
app.use(express.json())

defaultDate = new Date()

// Define the schema and model

const portionSchema = new mongoose.Schema({
    category: String,
    date: { type: Date, default: defaultDate },
    dateString: { type: String, default: date.format(defaultDate, 'YYYY-MM-DD', true) }
})

const Portion = mongoose.model('Portion', portionSchema)

// GET call to /api/portions should return all portions logged.

app.get('/api/portions', (req, res) => {
    Portion.find({}, (err, portions) => {
        res.send(portions)
    })
})

// GET call including params 'cat' and 'date' should return all portions of cat logged on date

app.get('/api/portions/:cat&:date', (req, res) => {
    Portion.find({ category: req.params.cat, dateString: req.params.date }, (err, portions) => {
        res.send(portions)
    })
})

// POST call should create new portion with current date

app.post('/api/portions', (req, res) => {
    const portion = new Portion({
        category: req.body.category
    })
    portion.save
    res.send(portion)
})

// DELETE call

app.delete('/api/portions/:cat', (req, res) => {
    Portion.deleteOne({ category: req.body.cat }, (err) =>{
        if (err) res.status(400).send('error')
    })
    res.status(200).send('Succesfully deleted')
})

// Start the app

app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}...`)
})
