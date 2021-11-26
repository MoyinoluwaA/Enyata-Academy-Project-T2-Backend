const express = require('express')
const {
	registerUser, loginUser, forgotPassword, resetPassword, getUserDetails,
} = require('../controller/user')
const checkUserExists = require('../middleware/checkUserExists')
const checkUserRole = require('../middleware/checkUserRole')
const validatePassword = require('../middleware/validatePassword')
const {
	verifyResetToken, getQueryToken, getAuthToken, verifyAuthToken,
} = require('../middleware/validateToken')
const validateInput = require('../middleware/validation')
const {
	createUserSchema, loginUserSchema, forgotPasswordSchema, resetTokenSchema, resetPasswordSchema,
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
		'/',
		getAuthToken,
		verifyAuthToken,
		checkUserRole('user'),
		getUserDetails,
	)

module.exports = router
