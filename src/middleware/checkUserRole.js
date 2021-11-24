/**
   * @description Ensure user role is same as the required type
   */

const checkUserRole = (type) => (req, res, next) => {
	const { user } = req

	if (user.role !== type) {
		return res.status(401).json({
			code: 401,
			status: 'fail',
			message: 'Invalid credentials',
			data: [],
		})
	}

	next()
}

module.exports = checkUserRole
