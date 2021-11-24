const express = require('express')
const { registerUser, loginUser } = require('../controller/user')
const checkUserExists = require('../middleware/checkUserExists')
const checkUserRole = require('../middleware/checkUserRole')
const validateInput = require('../middleware/validation')
const { createUserSchema, loginUserSchema } = require('../models/user')

const router = express.Router()

router.post(
	'/register',
	validateInput(createUserSchema, 'body'),
	checkUserExists('register'),
	registerUser,
)

router.post(
	'/login',
	validateInput(loginUserSchema, 'body'),
	checkUserExists('login'),
	checkUserRole('user'),
	loginUser,
)

module.exports = router
