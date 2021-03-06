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

/**
 * @description - update admin details using their id
 * @param {object} body request body
 * @param {number} id admin id
 * @returns {<promise>}
 */
exports.updateAdmin = async (body, id) => {
	const {
		picture, first_name, last_name, email, phone, address, country,
	} = body

	const payload = [picture, first_name, last_name, email, phone, address, country, id]
	return db.one(queries.updateAdmin, payload)
}

exports.verifyUser = async (email) => db.one(queries.verifyUser, [email])
