/* eslint-disable camelcase */
const db = require('../db')
const queries = require('../db/queries/user')
const { hashPassword } = require('../utils/password')

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

exports.passwordReset = async (email, password) => {
	const encryptedPassword = await hashPassword(password)
	return db.one(queries.updatePassword, [encryptedPassword, email])
}

exports.updateUser = async (body, id) => {
	const {
		date_of_birth, address, university, course, cgpa, cv, picture,
	} = body

	const payload = [date_of_birth, address, university, course, cgpa, cv, picture, id]
	return db.one(queries.updateUser, payload)
}
