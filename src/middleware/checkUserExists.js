const { getUserByEmail, getUserByPhone } = require('../services/user')

const checkUserExists = (type) => async (req, res, next) => {
	try {
		const { body: { email, phone } } = req
		let [user] = await getUserByEmail(email)

		if (type === 'register') {
			if (user) {
				return res.status(400).json({
					status: 'fail',
					message: 'User with this email already exists. Log in',
					data: [],
				})
			}

			[user] = await getUserByPhone(phone)

			if (user) {
				return res.status(400).json({
					status: 'fail',
					message: 'User with this phone number already exists. Log in',
					data: [],
				})
			}

			next()
		}
	} catch (err) {
		next(err)
	}
}

module.exports = checkUserExists
