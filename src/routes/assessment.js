const express = require('express')
const {
	createAssessment, getAssessment, addAssessmentScore, getAssessmentStatus,
} = require('../controller/assessment')
const checkApplicantStatus = require('../middleware/checkApplicantStatus')
const checkApplicationExists = require('../middleware/checkApplicationExists')
const checkAssessmentExists = require('../middleware/checkAssessmentExists')
const checkUserRole = require('../middleware/checkUserRole')
const { validateAssessmentDate } = require('../middleware/validateAssessmentDate')
const { getAuthToken, verifyAuthToken } = require('../middleware/validateToken')
const validateInput = require('../middleware/validation')
const { batchIdSchema, applicantIdSchema } = require('../models/application')
const { assessmentSchema, assessmentResultSchema } = require('../models/assessment')

const router = express.Router()

router
	.post(
		'/create/:batchId',
		getAuthToken,
		verifyAuthToken,
		checkUserRole('admin'),
		validateInput(batchIdSchema, 'params'),
		checkAssessmentExists('create'),
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
		checkAssessmentExists(),
		getAssessment,
	)

	.get(
		'/check',
		getAuthToken,
		verifyAuthToken,
		checkUserRole('admin'),
		validateInput(batchIdSchema, 'params'),
		checkAssessmentExists(),
		getAssessmentStatus,
	)

	.post(
		'/submit/:batchId',
		getAuthToken,
		verifyAuthToken,
		checkUserRole('user'),
		validateInput(batchIdSchema, 'params'),
		validateInput(applicantIdSchema, 'query'),
		checkApplicantStatus,
		validateInput(assessmentResultSchema, 'body'),
		checkAssessmentExists(),
		addAssessmentScore,
	)

module.exports = router
