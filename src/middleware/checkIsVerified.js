/* eslint-disable camelcase */
const { errorResponse } = require('../utils/errorResponse')

/**
 * @description - Middleware to check if user is verified
 * @param {string} type type of action to check for verification [login by default]
 * @param {object} req request object
 * @param {object} res response object
 * @param {function} next next function
 * @returns error response if user is not verified
 */
module.exports = (type = 'login') => (req, res, next) => {
	const { is_verified } = req.user

	if (type === 'verify') {
		if (is_verified) {
			return errorResponse(res, 'User is already verified', 400)
		}
		return next()
	}

	if (!is_verified) {
		return errorResponse(res, 'User is not verified', 401)
	}

	return next()
}
