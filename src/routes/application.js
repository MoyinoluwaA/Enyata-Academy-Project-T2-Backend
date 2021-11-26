const express = require('express')
const { createApplication } = require('../controller/application')
const validateInput = require('../middleware/validation')
const { applicationSchema } = require('../models/application')
const { getAuthToken, verifyAuthToken } = require('../middleware/validateToken')
const checkUserRole = require('../middleware/checkUserRole')
const checkApplicationExists = require('../middleware/checkApplicationExists')

const router = express.Router()

router
	.post(
		'/applications',
		getAuthToken,
		verifyAuthToken,
		checkUserRole('admin'),
		validateInput(applicationSchema, 'body'),
		checkApplicationExists,
		createApplication,
	)

module.exports = router
