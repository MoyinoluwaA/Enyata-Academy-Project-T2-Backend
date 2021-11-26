/* eslint-disable camelcase */
const { createUser, passwordReset } = require('../services/user')
const { generateToken } = require('../utils/token')
const { forgotPasswordHTML } = require('../constants/forgotPassword')
const emailHandler = require('../services/emailHandler')
const { passwordResetHTML } = require('../constants/passwordReset')
const { successResponse } = require('../utils/successResponse')

const registerUser = async (req, res, next) => {
	try {
		const { body } = req
		const newUser = await createUser(body)
		const { password, ...user } = newUser

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
			id, first_name, last_name, email, phone,
		} = req.user

		successResponse(
			res,
			'User details fetched successfully',
			{
				id, first_name, last_name, email, phone,
			},
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
}
