/* eslint-disable no-console */
const db = require('..')
const { seedAdmin, deleteUser } = require('../queries/user')
const { getUserByEmail, getUserByPhone } = require('../../services/user')
const { hashPassword } = require('../../utils/password')

const firstName = process.env.ADMIN_FIRSTNAME
const lastName = process.env.ADMIN_LASTNAME
const email = process.env.ADMIN_EMAIL
const password = process.env.ADMIN_PASSWORD
const phone = process.env.ADMIN_PHONE

/**
 * @description - Seed admin user
 * @param {string} email - email of admin user
 * @param {string} password - password of admin user
 * @param {string} firstName - first name of admin user
 * @param {string} lastName - last name of admin user
 * @param {string} phone - phone of admin user
 * @returns {Promise<void>}
 */
exports.seedAdmin = async () => {
	try {
		let user = await getUserByEmail(email)
		if (user.length) {
			console.log('Admin already exists')
			process.exit(0)
		}

		user = await getUserByPhone(phone)
		if (user.length) {
			console.log('Admin already exists')
			process.exit(0)
		}

		const hashedPassword = await hashPassword(password)
		await db.any(seedAdmin, [firstName, lastName, email, phone, hashedPassword])
		console.log('### Seeding admin successfull ###')
		process.exit(0)
	} catch (error) {
		console.log(error.message)
		process.exit(1)
	}
}

/**
 * @description - Delete admin user
 * @param {string} email - email of admin user
 * @returns {Promise<void>}
 */
exports.undoSeed = async () => {
	try {
		await db.none(deleteUser, [email])
		console.log('### Undo admin seeding successfull ###')
		process.exit(0)
	} catch (error) {
		console.log(error.message)
		process.exit(1)
	}
}
