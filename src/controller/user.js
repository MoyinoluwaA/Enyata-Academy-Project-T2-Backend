const { createUser } = require('../services/user')

const registerUser = async (req, res, next) => {
	try {
		const { body } = req
		const newUser = await createUser(body)
		const { password, ...user } = newUser

		res.status(201).json({
			code: 201,
			status: 'success',
			message: 'User added successfully',
			data: user,
		})
	} catch (err) {
		next(err)
	}
}

module.exports = {
	registerUser,
}
