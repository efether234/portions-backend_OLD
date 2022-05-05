const auth = require('../middleware/auth.js')
const { Portion, validate } = require('../models/portion')
const debug = require('debug')('app:db')
// const mongoose = require('mongoose')
const express = require('express')

const router = express.Router()

// GET call to /api/portions should return all portions logged.

router.get('/', auth, (req, res) => {
    Portion.find({ user: req.user._id }, (err, portions) => {
        res.send(portions)
    })
})

// POST call should create new portion with current date

router.post('/', auth, (req, res) => {
    const { error } = validate(req.body)
    if (error) {
        debug(error.details[0].message)
        return res.status(400).send(error.details[0].message)
    }
    const portion = new Portion({
        category: req.body.category,
        date: Date.now(),
        user: req.user._id
    })
    portion.save()
    res.send(portion)
})

// DELETE call

router.delete('/:cat', auth, (req, res) => {
    Portion.findOneAndDelete(
        {
            category: req.params.cat,
            user: req.user._id
        },
        { 'sort': { 'date': -1 } },
        (err) =>{
        if (err) res.status(400).send('error')
    })
    res.status(200).send('Succesfully deleted')
})

module.exports = router