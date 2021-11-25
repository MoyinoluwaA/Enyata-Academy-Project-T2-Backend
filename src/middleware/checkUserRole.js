/**
   * @description Ensure user role is same as the required type
   */

const { errorResponse } = require('../utils/errorResponse')

const checkUserRole = (type) => (req, res, next) => {
	const { user } = req

	if (user.role !== type) {
		return errorResponse(res, 'You are not authorized to access this route.', 401)
	}

	next()
}

module.exports = checkUserRole
