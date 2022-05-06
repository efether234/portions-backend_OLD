const mongoose = require('mongoose')
const winston = require('winston')

module.exports = () => {
    mongoose.connect(process.env.DB_URI + '/portions')
        .then(() => winston.info('Sucessfully connected to DB.'))
}