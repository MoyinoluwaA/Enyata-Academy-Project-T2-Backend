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
		date_of_birth: Joi.date().required(),
		address: Joi.string().required(),
		university: Joi.string().required(),
		course: Joi.string().required(),
		cgpa: Joi.string().required(),
		cv: Joi.object().keys({
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
		}).required(),
		picture: Joi.object().keys({
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
		}).required(),
	}),
	message: 'Error occured while making application',
}

const batchIdSchema = {
	schema: Joi.object().keys({
		batchId: Joi.string().required(),
	}),
	message: 'Error occured while making application',
}

const applicantStatusSchema = {
	schema: Joi.object().keys({
		status: Joi.string().valid('approved', 'declined').required(),
	}),
	message: 'Error occured while updating applicant status',
}

const applicantIdSchema = {
	schema: Joi.object().keys({
		applicantId: Joi.string().required(),
	}),
	message: 'Error occured while updating applicant status',
}

module.exports = {
	applicationSchema,
	makeApplicationSchema,
	batchIdSchema,
	applicantStatusSchema,
	applicantIdSchema,
}
