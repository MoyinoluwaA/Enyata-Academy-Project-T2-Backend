const jwt = require('jsonwebtoken')
const { errorResponse } = require('../utils/errorResponse')
const { getUserByEmail } = require('../services/user')

exports.getQueryToken = async (req, res, next) => {
	const { resetToken } = req.query

	req.token = resetToken
	next()
}

exports.verifyResetToken = async (req, res, next) => {
	try {
		const { token } = req
		const { email } = jwt.decode(token)

		const [user] = await getUserByEmail(email)

		if (!user) {
			return errorResponse(res, 'Invalid reset url', 400)
		}

		const { password } = user

		jwt.verify(token, password, (err) => {
			if (err) {
				return errorResponse(res, 'Invalid reset url', 400)
			}
		})

		req.user = user

		next()
	} catch (error) {
		next(error)
	}
}
