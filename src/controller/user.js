/* eslint-disable camelcase */
const {
	createUser, passwordReset, updateAdmin, verifyUser,
} = require('../services/user')
const { generateToken } = require('../utils/token')
const { forgotPasswordHTML } = require('../constants/forgotPassword')
const emailHandler = require('../services/emailHandler')
const { passwordResetHTML } = require('../constants/passwordReset')
const { successResponse } = require('../utils/successResponse')
const { verifyUserEmail, verifiedSuccess } = require('../constants/verifyUser')

const registerUser = async (req, res, next) => {
	try {
		const { body } = req
		const newUser = await createUser(body)
		const { password, ...user } = newUser

		// generate token
		const token = await generateToken(user)

		// send mail
		const subject = 'Welcome to Enyata Academy'
		const text = 'Verify your account here'
		const html = verifyUserEmail(user.first_name, token)
		await emailHandler(user.email, subject, text, html)

		successResponse(res, 'User added successfully', user, 201)
	} catch (err) {
		next(err)
	}
}

const loginUser = async (req, res, next) => {
	try {
		const { user } = req
		const token = await generateToken(user)

		successResponse(res, 'User logged in successfully', { role: user.role, token }, 200)
	} catch (err) {
		next(err)
	}
}

const forgotPassword = async (req, res, next) => {
	try {
		const {
			id, email, password, first_name,
		} = req.user
		const token = await generateToken({ id, email }, password, 'reset')

		// send mail
		const subject = 'Password Reset'
		const text = 'Reset your password'
		const html = forgotPasswordHTML(first_name, token)
		await emailHandler(email, subject, text, html)

		successResponse(res, 'Password reset link sent to mail successfully', [], 200)
	} catch (err) {
		next(err)
	}
}

const resetPassword = async (req, res, next) => {
	try {
		const { body: { password }, user } = req

		const { role, email } = await passwordReset(user.email, password)

		// send mail
		const subject = 'Password Reset Successful'
		const text = 'Your password has been reset successfully'
		const html = passwordResetHTML(user.first_name)
		await emailHandler(user.email, subject, text, html)

		successResponse(res, 'Password reset successful', { role, email }, 200)
	} catch (err) {
		next(err)
	}
}

const getUserDetails = (req, res, next) => {
	try {
		const {
			id, first_name, last_name, email, phone, picture,
		} = req.user

		successResponse(
			res,
			'User details fetched successfully',
			{
				id, first_name, last_name, email, phone, picture,
			},
			200,
		)
	} catch (err) {
		next(err)
	}
}

/**
 * @description - Updates the admin details
 * @param {Request} req the request object
 * @param {Response} res the response object
 * @param {function} next the next middleware function
 * @returns {object} the success response object
 */
const updateAdminDetails = async (req, res, next) => {
	try {
		const {
			user: {
				id, first_name, last_name, email, phone, address, country,
			},
			body,
		} = req

		const { password, ...updatedAdmin } = await updateAdmin({
			first_name, last_name, email, phone, address, country, ...body,
		}, id)

		successResponse(
			res,
			'User details updated successfully',
			updatedAdmin,
			200,
		)
	} catch (err) {
		next(err)
	}
}

const verifyUserByEmail = async (req, res, next) => {
	try {
		const { email } = req.user

		const { password, ...user } = await verifyUser(email)

		// send mail
		const subject = 'Email verified successfully'
		const text = 'Account verified successfully'
		const html = verifiedSuccess(user.first_name)
		await emailHandler(email, subject, text, html)

		successResponse(
			res,
			'User verified successfully',
			user,
			200,
		)
	} catch (err) {
		next(err)
	}
}

module.exports = {
	registerUser,
	loginUser,
	forgotPassword,
	resetPassword,
	getUserDetails,
	updateAdminDetails,
	verifyUserByEmail,
}
