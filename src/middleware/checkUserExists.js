const { getUserByEmail, getUserByPhone } = require('../services/user')

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
				return res.status(400).json({
					code: 400,
					status: 'failed',
					message: 'User with this email already exists. Log in',
					data: [],
				})
			}

			[user] = await getUserByPhone(phone)

			if (user) {
				return res.status(400).json({
					code: 400,
					status: 'failed',
					message: 'User with this phone number already exists. Log in',
					data: [],
				})
			}

			next()
		} else {
			// eslint-disable-next-line no-lonely-if
			if (!user) {
				return res.status(401).json({
					code: 401,
					status: 'failed',
					message: 'Invalid credentials',
					data: [],
				})
			}

			req.user = user
			next()
		}
	} catch (err) {
		next(err)
	}
}

module.exports = checkUserExists
