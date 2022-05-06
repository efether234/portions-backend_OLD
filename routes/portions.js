const auth = require('../middleware/auth')
const { Portion, validate } = require('../models/portion')
const debug = require('debug')('app:db')
const express = require('express')

const router = express.Router()

router.get('/', auth, async (req, res) => {
    const portions = await Portion.find({ user: req.user._id })
    res.send(portions)
})

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