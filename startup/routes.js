const express = require('express')
const portions = require('../routes/portions')
const users = require('../routes/users')
const auth = require('../routes/auth')
const error = require('../middleware/error')

module.exports = (app) => {
    app.use(express.json())
    app.use('/api/portions', portions)
    app.use('/api/users', users)
    app.use('/api/auth', auth)
    app.use(error)
}