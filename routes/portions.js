const Portion = require('../models/portion')
const mongoose = require('mongoose')
const express = require('express')

const router = express.Router()

// GET call to /api/portions should return all portions logged.

router.get('/', (req, res) => {
    Portion.find({}, (err, portions) => {
        res.send(portions)
    })
})

// GET call including params 'date' should return all portions logged on date
// Date format must be YYYY-MM-DD

router.get('/:date', (req, res) => {
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

router.post('/', (req, res) => {
    const portion = new Portion({
        category: req.body.category,
        date: Date.now()
    })
    portion.save()
    res.send(portion)
})

// DELETE call

router.delete('/:cat', (req, res) => {
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

module.exports = router