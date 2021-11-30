const express = require('express')
const {
	registerUser, loginUser, forgotPassword, resetPassword, getUserDetails, updateAdminDetails,
	verifyUserByEmail,
} = require('../controller/user')
const checkIsVerified = require('../middleware/checkIsVerified')
const checkUserExists = require('../middleware/checkUserExists')
const checkUserRole = require('../middleware/checkUserRole')
const validatePassword = require('../middleware/validatePassword')
const {
	verifyResetToken, getQueryToken, getAuthToken, verifyAuthToken,
} = require('../middleware/validateToken')
const validateInput = require('../middleware/validation')
const {
	createUserSchema, loginUserSchema, forgotPasswordSchema, resetTokenSchema, resetPasswordSchema,
	updateAdminSchema, verifyTokenSchema,
} = require('../models/user')

const router = express.Router()

router
	.post(
		'/register',
		validateInput(createUserSchema, 'body'),
		checkUserExists('register'),
		registerUser,
	)
	.post(
		'/login',
		validateInput(loginUserSchema, 'body'),
		checkUserExists('login'),
		checkUserRole('user'),
		checkIsVerified('login'),
		validatePassword,
		loginUser,
	)
	.post(
		'/forgot_password',
		validateInput(forgotPasswordSchema, 'body'),
		checkUserExists('forgot_password'),
		forgotPassword,
	)
	.put(
		'/reset_password',
		validateInput(resetTokenSchema, 'query'),
		validateInput(resetPasswordSchema, 'body'),
		getQueryToken,
		verifyResetToken,
		resetPassword,
	)
	.post(
		'/admin/login',
		validateInput(loginUserSchema, 'body'),
		checkUserExists('login'),
		checkUserRole('admin'),
		validatePassword,
		loginUser,
	)
	.get(
		'/details',
		getAuthToken,
		verifyAuthToken,
		checkUserRole('user'),
		getUserDetails,
	)
	.put(
		'/admin/update',
		getAuthToken,
		verifyAuthToken,
		checkUserRole('admin'),
		validateInput(updateAdminSchema, 'body'),
		updateAdminDetails,
	)
	.put(
		'/verify',
		validateInput(verifyTokenSchema, 'query'),
		getQueryToken,
		verifyAuthToken,
		checkUserRole('user'),
		checkIsVerified('verify'),
		verifyUserByEmail,
	)

module.exports = router
