const Joi = require('joi')

const createUserSchema = {
    schema: Joi.object().keys({
        email: Joi.string().email().required(),
        first_name: Joi.string().required(),
        last_name: Joi.string().required(),
        phone: Joi.string().required(),
        password: Joi.string().required()
    }),
    message: 'Error creating new user'
}

module.exports = {
    createUserSchema
}
