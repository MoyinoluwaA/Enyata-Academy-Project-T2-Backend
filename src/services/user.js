/* eslint-disable camelcase */
const db = require('../db')
const queries = require('../db/queries/user')
const { hashPassword, comparePassword } = require('../utils/password')
const { generateToken } = require('../utils/token')

exports.createUser = async (body) => {
	const {
		first_name, last_name, email, phone, password,
	} = body
	const encryptedPassword = await hashPassword(password)

	const payload = [first_name, last_name, email, phone, encryptedPassword]
	return db.one(queries.addUser, payload)
}

exports.getUserByEmail = (email) => db.any(queries.getUserByEmail, email)
exports.getUserByPhone = (phone) => db.any(queries.getUserByPhone, phone)

exports.validatePassword = async (user, password) => {
	const isValid = await comparePassword(password, user.password)

	if (isValid) {
		const token = await generateToken(user, 'access')
		return { token }
	}
	return false
}
