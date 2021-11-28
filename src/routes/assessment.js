const express = require('express')
const { createAssessment } = require('../controller/assessment')
const checkApplicationExists = require('../middleware/checkApplicationExists')
const checkUserRole = require('../middleware/checkUserRole')
const { validateAssessmentDate } = require('../middleware/validateAssessmentDate')
const { getAuthToken, verifyAuthToken } = require('../middleware/validateToken')
const validateInput = require('../middleware/validation')
const { assessmentSchema } = require('../models/assessment')

const router = express.Router()

router
	.post(
		'/create',
		getAuthToken,
		verifyAuthToken,
		checkUserRole('admin'),
		validateInput(assessmentSchema, 'body'),
		checkApplicationExists('createAssessment'),
		validateAssessmentDate,
		createAssessment,
	)

module.exports = router
