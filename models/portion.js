const mongoose = require('mongoose')

const Portion = mongoose.model('Portion', new mongoose.Schema({
    category: String,
    date: {
        type: Date,
        default: Date.now()
    }
}))

module.exports = Portion