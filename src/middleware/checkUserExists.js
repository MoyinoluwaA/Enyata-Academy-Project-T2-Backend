const { getUserByEmail, getUserByPhone } = require('../services/user')
const { errorResponse } = require('../utils/errorResponse')

/**
   * @description Ensure user that exists that tries to register receives
   * 400 response and user that doesn't have an account can't log in
   */
const checkUserExists = (type) => async (req, res, next) => {
	try {
		const { body: { email, phone } } = req
		let [user] = await getUserByEmail(email)

		if (type === 'register') {
			if (user) {
				return errorResponse(res, 'User with this email already exists. Log in', 400)
			}

			[user] = await getUserByPhone(phone)

			if (user) {
				return errorResponse(res, 'User with this phone number already exists. Log in', 400)
			}

			next()
		} else {
			// eslint-disable-next-line no-lonely-if
			if (!user) {
				return errorResponse(res, 'User with this email does not exist. Register', 404)
			}

			req.user = user
			next()
		}
	} catch (err) {
		next(err)
	}
}

module.exports = checkUserExists
