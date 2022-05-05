const Joi = require('joi')
const mongoose = require('mongoose')

const Portion = mongoose.model('Portion', new mongoose.Schema({
    category: {
        type: String,
        required: true,
        enum: [
            'proteins',
            'dairy',
            'fruits',
            'vegetables',
            'fats',
            'carbohydrates',
            'snacks',
            'condiments'
        ]
    },
    date: {
        type: Date,
        required: true,
        default: Date.now()
    }
}))

function validatePortion(portion) {
    const schema = Joi.object({
        category: Joi.string()
            .valid(
                'proteins',
                'dairy',
                'fruits',
                'vegetables',
                'fats',
                'carbohydrates',
                'snacks',
                'condiments'
            )
            .required()
    })
    return schema.validate(portion)
}

module.exports.Portion = Portion
module.exports.validate = validatePortion