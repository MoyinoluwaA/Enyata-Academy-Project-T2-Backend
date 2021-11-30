const express = require('express')
const { createAssessment, getAssessment, addAssessmentScore } = require('../controller/assessment')
const checkApplicantStatus = require('../middleware/checkApplicantStatus')
const checkApplicationExists = require('../middleware/checkApplicationExists')
const checkAssessmentExists = require('../middleware/checkAssessmentExists')
const checkIfApplicant = require('../middleware/checkIfApplicant')
const checkUserRole = require('../middleware/checkUserRole')
const { validateAssessmentDate } = require('../middleware/validateAssessmentDate')
const { getAuthToken, verifyAuthToken } = require('../middleware/validateToken')
const validateInput = require('../middleware/validation')
const { batchIdSchema, applicantScoreSchema, applicantIdSchema } = require('../models/application')
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
		'/questions/:batchId',
		getAuthToken,
		verifyAuthToken,
		checkUserRole('user'),
		validateInput(applicantIdSchema, 'query'),
		checkApplicantStatus,
		validateInput(batchIdSchema, 'params'),
		checkAssessmentExists,
		getAssessment,
	)

	.post(
		'/result/:batchId',
		getAuthToken,
		verifyAuthToken,
		checkUserRole('user'),
		validateInput(batchIdSchema, 'params'),
		validateInput(applicantScoreSchema, 'body'),
		checkApplicantStatus,
		checkIfApplicant('result'),
		addAssessmentScore,
	)

module.exports = router
