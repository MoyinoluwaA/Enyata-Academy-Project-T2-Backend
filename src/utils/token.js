const jwt = require('jsonwebtoken')

exports.generateToken = async (user, type) => {
	const token = jwt.sign(
		{ id: user.id, email: user.email },
		type === 'access' ? process.env.TOKEN_KEY : process.env.RESET_TOKEN_KEY,
		{
			expiresIn: type === 'access' ? '4h' : '1h',
		},
	)
	return token
}
