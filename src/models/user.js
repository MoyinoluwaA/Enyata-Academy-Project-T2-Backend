const Joi = require('joi')

const createUserSchema = {
	schema: Joi.object().keys({
		email: Joi.string().email().required(),
		first_name: Joi.string().required(),
		last_name: Joi.string().required(),
		phone: Joi.string().required(),
		password: Joi.string().required(),
	}),
	message: 'Error creating new user',
}

const loginUserSchema = {
	schema: Joi.object().keys({
		email: Joi.string().email().required(),
		password: Joi.string().required(),
	}),
	message: 'Error logging in user',
}

const forgotPasswordSchema = {
	schema: Joi.object().keys({
		email: Joi.string().email().required(),
	}),
	message: 'Error resetting password',
}

const resetPasswordSchema = {
	schema: Joi.object().keys({
		password: Joi.string().required(),
	}),
	message: 'Error resetting password',
}

const resetTokenSchema = {
	schema: Joi.object().keys({
		resetToken: Joi.string().required(),
	}),
	message: 'Error resetting password',
}

const accessTokenSchema = {
	schema: Joi.object().keys({
		accessToken: Joi.string().required(),
	}),
	message: 'Error resetting password',
}

const updateAdminSchema = {
	schema: Joi.object().keys({
		picture: Joi.object().keys({
			public_id: Joi.string(),
			original_filename: Joi.string(),
			url: Joi.string().uri({
				scheme: [
					/http/,
				],
			}),
			secure_url: Joi.string().uri({
				scheme: [
					/https/,
				],
			}),
			format: Joi.string(),
		}),
		first_name: Joi.string(),
		last_name: Joi.string(),
		email: Joi.string().email(),
		phone: Joi.string(),
		address: Joi.string(),
		country: Joi.string(),
	}),
	message: 'Error updating admin',
}

const verifyTokenSchema = {
	schema: Joi.object().keys({
		verifyToken: Joi.string().required(),
	}),
	message: 'Verify Token is required',
}

module.exports = {
	createUserSchema,
	loginUserSchema,
	forgotPasswordSchema,
	resetPasswordSchema,
	resetTokenSchema,
	accessTokenSchema,
	updateAdminSchema,
	verifyTokenSchema,
}
