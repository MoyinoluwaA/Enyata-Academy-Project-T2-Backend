const Joi = require('joi')

const applicationSchema = {
	schema: Joi.object().keys({
		batch_id: Joi.string().required(),
		start_date: Joi.date().raw().greater('now').required(),
		closing_date: Joi.date().raw().min(Joi.ref('start_date')).required(),
		application_link: Joi.string().required(),
		instructions: Joi.string().required(),
	}),
	message: 'Error creating application',
}

module.exports = {
	applicationSchema,
}
