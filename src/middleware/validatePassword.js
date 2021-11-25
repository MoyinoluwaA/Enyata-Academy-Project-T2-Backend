const { errorResponse } = require('../utils/errorResponse')
const { comparePassword } = require('../utils/password')

module.exports = async (req, res, next) => {
	const { body: { password }, user } = req
	const isValid = await comparePassword(password, user.password)

	if (!isValid) {
		return errorResponse(res, 'Invalid credentials', 401)
	}
	next()
}
