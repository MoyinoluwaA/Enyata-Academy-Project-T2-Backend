const express = require('express')
const { createAssessment, getAssessment } = require('../controller/assessment')
const checkApplicationExists = require('../middleware/checkApplicationExists')
const checkAssessmentExists = require('../middleware/checkAssessmentExists')
const checkUserRole = require('../middleware/checkUserRole')
const { validateAssessmentDate } = require('../middleware/validateAssessmentDate')
const { getAuthToken, verifyAuthToken } = require('../middleware/validateToken')
const validateInput = require('../middleware/validation')
const { batchIdSchema } = require('../models/application')
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

	.get(
		'/questions',
		getAuthToken,
		verifyAuthToken,
		checkUserRole('user'),
		validateInput(batchIdSchema, 'query'),
		checkAssessmentExists,
		getAssessment,
	)

module.exports = router
