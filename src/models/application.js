const Joi = require('joi')

const applicationSchema = {
	schema: Joi.object().keys({
		batch_id: Joi.string().required(),
		start_date: Joi.date().raw().greater('now').required(),
		closing_date: Joi.date().raw().min(Joi.ref('start_date')).required(),
		application_link: Joi.string().uri({
			scheme: [
				/https/,
			],
		}).required(),
		instructions: Joi.string().required(),
	}),
	message: 'Error creating application',
}

const makeApplicationSchema = {
	schema: Joi.object().keys({
		address: Joi.string().required(),
		university: Joi.string().required(),
		course: Joi.string().required(),
		cgpa: Joi.string().required(),
		cv: Joi.string().uri({
			scheme: [
				/https/,
			],
		}).required(),
		picture: Joi.string().uri({
			scheme: [
				/https/,
			],
		}).required(),
	}),
	message: 'Error while applying',
}

module.exports = {
	applicationSchema,
	makeApplicationSchema,
}
