const express = require('express')
const { createApplication, makeApplication } = require('../controller/application')
const validateInput = require('../middleware/validation')
const { applicationSchema, makeApplicationSchema } = require('../models/application')
const { getAuthToken, verifyAuthToken } = require('../middleware/validateToken')
const checkUserRole = require('../middleware/checkUserRole')
const checkApplicationExists = require('../middleware/checkApplicationExists')
const checkIfApplicant = require('../middleware/checkIfApplicant')
const getCurrentApplication = require('../middleware/getCurrentApplicatiom')

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

	.put(
		'/applications/create',
		getAuthToken,
		verifyAuthToken,
		checkUserRole('user'),
		validateInput(makeApplicationSchema, 'body'),
		getCurrentApplication,
		checkIfApplicant,
		makeApplication,
	)

module.exports = router
