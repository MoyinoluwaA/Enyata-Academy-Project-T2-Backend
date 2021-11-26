const jwt = require('jsonwebtoken')
const { errorResponse } = require('../utils/errorResponse')
const { getUserByEmail } = require('../services/user')

exports.getQueryToken = async (req, res, next) => {
	const { resetToken } = req.query

	req.token = resetToken
	next()
}

exports.getAuthToken = async (req, res, next) => {
	const authHeader = req.headers.authorization

	if (!authHeader || !authHeader.startsWith('Bearer')) {
		return errorResponse(res, 'authentication error. token required.', 401)
	}

	// eslint-disable-next-line prefer-destructuring
	req.token = authHeader.split(' ')[1]
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

exports.verifyAuthToken = async (req, res, next) => {
	try {
		const { token } = req
		const { email } = jwt.verify(token, process.env.TOKEN_KEY)

		const [verifiedUser] = await getUserByEmail(email)

		if (!verifiedUser) {
			return errorResponse(res, 'user not found', 404)
		}

		req.user = verifiedUser
		next()
	} catch (error) {
		errorResponse(res, 'Not authorized to access this route, token invalid or expired', 401)
	}
}
