const Joi = require('joi')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        minlength: 6,
        maxlength: 20,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        minlength: 5,
        maxlength: 255,
    },
    password: {
        type: String,
        required: true,
        maxlength: 1025,
    }
})

userSchema.methods.generateAuthToken = function() {
    return jwt.sign({_id: this._id}, process.env.JWTPRIVATEKEY)
}

const User = mongoose.model('User', userSchema)

function validateUser(user) {
    const schema = Joi.object({
        username: Joi.string().min(6).max(20).required(),
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(8).max(255).required()
    })

    return schema.validate(user)
}

module.exports.User = User
module.exports.validate = validateUser