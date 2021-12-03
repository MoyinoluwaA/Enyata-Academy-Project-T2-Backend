const jwt = require('jsonwebtoken')

exports.generateToken = async (user, secret, type = 'access') => {
	const token = jwt.sign(
		{ id: user.id, email: user.email },
		type === 'access' ? process.env.TOKEN_KEY : secret,
		{
			expiresIn: type === 'access' ? '7h' : '1h',
		},
	)
	return token
}
