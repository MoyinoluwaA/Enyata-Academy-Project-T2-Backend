const Joi = require('joi')

exports.assessmentSchema = {
	schema: Joi.object().keys({
		assessment_test: Joi.array().items(Joi.object().keys({
			question: Joi.string().required(),
			image: Joi.object().keys({
				public_id: Joi.string().required(),
				original_filename: Joi.string().required(),
				url: Joi.string().uri({
					scheme: [
						/http/,
					],
				}).required(),
				secure_url: Joi.string().uri({
					scheme: [
						/https/,
					],
				}).required(),
				format: Joi.string(),
			}),
			options: Joi.object().keys({
				a: Joi.string().required(),
				b: Joi.string().required(),
				c: Joi.string().required(),
				d: Joi.string().required(),
			}).required(),
			answer: Joi.string().required(),
		}).required()).required(),
		start_date: Joi.date().raw().greater('now').required(),
		closing_date: Joi.date().raw().min(Joi.ref('start_date')).required(),
		time_allotted: Joi.number().required(),
	}),
	message: 'Error creating assessment',
}

exports.assessmentResultSchema = {
	schema: Joi.object().keys({
		assessment_answers: Joi.object().required(),
	}),
	message: 'Error adding applicant scores',
}
